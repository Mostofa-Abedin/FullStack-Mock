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

const ProjectsList = ({ projects, setProjects }) => {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("authToken");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentItem, setCurrentItem] = useState(null);
  const [clients, setClients] = useState([]); 

  // 🔹 Fetch Clients from Backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${baseUrl}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch clients");

        const data = await response.json();

        // 🔹 Filter only clients (role: "client")
        const clientUsers = data.filter((user) => user.role === "client");

        setClients(clientUsers); 
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  // 🔹 Handle Delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete project");

      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // 🔹 Handle Save (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const selectedClientId = formData.get("client"); // Ensure correct ID is used

    const projectData = {
      projectName: formData.get("name"),
      clientId: selectedClientId || null, 
      status: formData.get("status"),
      description: formData.get("description"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
    };



    // 🔴 Validate required fields BEFORE sending request
    if (!projectData.projectName || !projectData.clientId || !projectData.startDate || !projectData.endDate) {
      console.error("❌ Missing required fields! Ensure client is selected and dates are filled.");
      return;
    }

    try {
      let response;
      if (modalType === "edit" && currentItem) {
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
        const errorMessage = await response.text();
        throw new Error(`Failed to save project: ${errorMessage}`);
      }

      const updatedProject = await response.json();

      setProjects((prev) => {
        if (modalType === "edit") {
          return prev.map((proj) =>
            proj._id === updatedProject._id ? updatedProject : proj
          );
        } else {
          return [...prev, updatedProject];
        }
      });

      setModalVisible(false);
      setCurrentItem(null);
    } catch (error) {
      console.error("❌ Error saving project:", error);
    }
  };

  return (
    <CContainer fluid>
      <Link to="/admin/dashboard">
        <CButton className="dashboard-button">Back to Dashboard</CButton>
      </Link>

      <CCard className="dash-main-card">
        <CCardHeader className="dash-card-header">
          <h4>All Projects</h4>
          <CButton
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
          <CRow>
            {projects.map((project, index) => {

              return (
                <CCol sm="4" key={project._id || index}>
                  <div className="dash-card">
                    <h5>{project.projectName}</h5>
                    <p>Client: {project.clientId?.name || "N/A"}</p> 
                    <p>
                      Due Date:{" "}
                      {project.endDate
                        ? new Date(project.endDate).toLocaleDateString("en-GB")
                        : "N/A"}
                    </p>
                    <CButton
                      onClick={() => {
                        setModalType("edit");
                        setCurrentItem(project);
                        setModalVisible(true);
                      }}
                    >
                      Edit
                    </CButton>
                    <CButton onClick={() => handleDelete(project._id)}>
                      Delete
                    </CButton>
                  </div>
                </CCol>
              );
            })}
          </CRow>
        </CCardBody>
      </CCard>

      {/* Modal for Add/Edit Project */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            {modalType === "edit" ? "Edit Project" : "Add Project"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={handleSubmit}>
            <CFormInput
              type="text"
              label="Project Name"
              name="name"
              defaultValue={currentItem?.projectName || ""}
            />

            {/* 🔹 Client Dropdown (Ensures ObjectId is Sent) */}
            <CFormSelect
              label="Client"
              name="client"
              defaultValue={currentItem?.clientId?._id || ""}
            >
              <option value="" disabled>Select a Client</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name} 
                </option>
              ))}
            </CFormSelect>

            <CFormSelect label="Status" name="status" defaultValue={currentItem?.status || "In Progress"}>
              <option value="Upcoming">Upcoming</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </CFormSelect>

            <CFormInput type="text" label="Description" name="description" defaultValue={currentItem?.description || ""} />
            <CFormInput type="date" label="Start Date" name="startDate" defaultValue={currentItem?.startDate || ""} />
            <CFormInput type="date" label="End Date" name="endDate" defaultValue={currentItem?.endDate || ""} />

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
