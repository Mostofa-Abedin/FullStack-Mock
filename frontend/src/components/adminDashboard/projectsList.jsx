import React, { useState, useEffect } from "react";
import "./admindashboard.css";
import { Link } from "react-router-dom";
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
  CFormSelect,
} from "@coreui/react";

const ProjectsList = () => {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("authToken");

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Projects from Backend
  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${baseUrl}/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data.projects);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Fetch Clients from Backend
  const fetchClients = async () => {
    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }

      const data = await response.json();
      setClients(data.users);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  // Handle Delete Project
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Handle Save (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const projectData = {
      projectName: formData.get("name"),
      clientId: formData.get("client"),
      status: formData.get("status"),
      endDate: formData.get("dueDate"),
      description: formData.get("details"),
    };

    try {
      let response;

      if (modalType === "edit") {
        response = await fetch(`${baseUrl}/projects/${currentItem._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(projectData),
        });
      } else {
        response = await fetch(`${baseUrl}/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(projectData),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      fetchProjects(); // Refresh project list
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  // Dynamic status color
  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "in-progress";
      case "Completed":
        return "complete";
      case "On Hold":
        return "on-hold";
      default:
        return "upcoming";
    }
  };

  return (
    <CContainer fluid>
      <Link to="/admin/dashboard">
        <CButton className="dashboard-button">Back to Dashboard</CButton>
      </Link>

      <CCard className="dash-main-card">
        <CCardHeader className="dash-card-header">
          <h4>Manage Projects</h4>
          <CButton
            className="dash-add-button"
            onClick={() => {
              setModalType("add");
              setCurrentItem(null);
              setModalVisible(true);
            }}
          >
            Add Project
          </CButton>
        </CCardHeader>
        <CCardBody>
          {loading ? (
            <p>Loading projects...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : projects.length === 0 ? (
            <p>No projects available.</p>
          ) : (
            <CRow>
              {projects.map((project) => (
                <CCol sm="4" key={project._id}>
                  <div className={`dash-card ${getStatusColor(project.status)}`}>
                    <p className="status">{project.status}</p>
                    <h5>{project.projectName}</h5>
                    <p>Client: {project.clientId?.name || "Unknown"}</p>
                    <p>Details: {project.description}</p>
                    <p>
                      <strong>Due Date:</strong>{" "}
                      {new Date(project.endDate).toLocaleDateString("en-GB")}
                    </p>
                    <div className="d-flex justify-content-end">
                      <CButton
                        className="dash-edit"
                        onClick={() => {
                          setModalType("edit");
                          setCurrentItem(project);
                          setModalVisible(true);
                        }}
                      >
                        Edit
                      </CButton>
                      <CButton
                        className="dash-delete"
                        onClick={() => handleDelete(project._id)}
                      >
                        Delete
                      </CButton>
                    </div>
                  </div>
                </CCol>
              ))}
            </CRow>
          )}
        </CCardBody>
      </CCard>

      {/* Modal for Add/Edit */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            {modalType === "edit" ? `Edit Project` : `Add Project`}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={handleSubmit}>
            <CFormInput type="text" label="Project Name" name="name" defaultValue={currentItem?.projectName} />
            <CFormInput type="text" label="Details" name="details" defaultValue={currentItem?.description} />
            <CFormSelect label="Client" name="client" defaultValue={currentItem?.clientId?._id}>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name}
                </option>
              ))}
            </CFormSelect>
            <CFormInput type="date" label="Due Date" name="dueDate" defaultValue={currentItem?.endDate} />
            <CFormSelect label="Status" name="status" defaultValue={currentItem?.status}>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </CFormSelect>
            <CModalFooter>
              <CButton onClick={() => setModalVisible(false)}>Close</CButton>
              <CButton type="submit">Save Changes</CButton>
            </CModalFooter>
          </form>
        </CModalBody>
      </CModal>
    </CContainer>
  );
};

export default ProjectsList;
