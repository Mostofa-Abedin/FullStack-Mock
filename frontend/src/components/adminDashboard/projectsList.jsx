import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "./admindashboard.css";
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
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      client: "John's Bakery",
      status: "In Progress",
      dueDate: "2025-03-01",
      details: "Complete overhaul of the existing website.",
    },
    {
      id: 2,
      name: "Brand Identity Creation",
      client: "Jane's Designs",
      status: "Completed",
      dueDate: "2024-12-15",
      details: "Design and implement brand identity for the client.",
    },
    {
      id: 3,
      name: "E-Commerce Store Setup",
      client: "Robert's Auto Shop",
      status: "In Progress",
      dueDate: "2025-02-20",
      details: "Setting up an online store for Robert's Auto Shop.",
    },
    {
      id: 4,
      name: "SEO Optimization",
      client: "Alice's Garden",
      status: "Completed",
      dueDate: "2024-11-30",
      details: "SEO work for Alice's Garden's website.",
    },
    {
      id: 5,
      name: "Social Media Marketing",
      client: "Michael's Repair",
      status: "Not Started",
      dueDate: "2025-04-01",
      details: "Developing a social media strategy for Michael's Repair.",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);
  const [formSection, setFormSection] = useState("projects");

  // Clients list (static for now, but you can replace with a dynamic list)
  const clients = [
    { id: 1, name: "John's Bakery" },
    { id: 2, name: "Jane's Designs" },
    { id: 3, name: "Robert's Auto Shop" },
    { id: 4, name: "Alice's Garden" },
    { id: 5, name: "Michael's Repair" },
  ];

  // Handle Delete
  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  // Handle Save (for Add/Edit)
  const handleSubmit = (e, modalType) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(e.target);

    const newProject = {
      id: currentItem?.id || new Date().getTime(), // Generate a new ID for add
      name: formData.get("name"),
      client: formData.get("client"),
      status: formData.get("status"),
      dueDate: formData.get("dueDate"),
      details: formData.get("details"),
    };

    if (modalType === "edit") {
      // Update project
      setProjects(
        projects.map((project) =>
          project.id === currentItem.id ? newProject : project
        )
      );
    } else {
      // Add new project
      setProjects([...projects, newProject]);
    }

    setModalVisible(false); // Close modal after saving
  };

  // Dynamic status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming":
        return "upcoming";
      case "In Progress":
        return "in-progress";
      case "Client Review":
        return "client-review";
      case "Action Feedback":
        return "action-feedback";
      case "Complete":
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
        <CButton className="add-button">Back to Dashboard</CButton>
      </Link>
      {/* Add/Edit Project Section */}
      <CCard className="main-card">
        <CCardHeader className="card-header">
          <h4>Manage Projects</h4>
          <CButton
            className="add-button"
            onClick={() => {
              setFormSection("projects");
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
            {projects.map((project) => (
              <CCol sm="4" key={project.id}>
                <div
                  className={`card p-3 shadow-sm ${getStatusColor(
                    project.status
                  )}`}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      fontSize: "16px",
                      textAlign: "right",
                    }}
                  >
                    {project.status}
                  </p>
                  <h5>{project.name}</h5>
                  <p>{project.client}</p>
                  <p>Details: {project.details}</p>
                  <p style={{ fontWeight: "bold" }}>
                    Due Date:{" "}
                    {new Date(project.dueDate).toLocaleDateString("en-GB")}
                  </p>
                  <div className="d-flex justify-content-end">
                    <CButton
                      className="edit"
                      onClick={() => {
                        setFormSection("projects");
                        setModalType("edit");
                        setCurrentItem(project);
                        setModalVisible(true);
                      }}
                    >
                      Edit
                    </CButton>
                    <CButton
                      className="delete"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </CButton>
                  </div>
                </div>
              </CCol>
            ))}
          </CRow>
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
          <form onSubmit={(e) => handleSubmit(e, modalType)}>
            <CFormInput
              type="text"
              label="Project Name"
              name="name"
              defaultValue={currentItem?.name}
            />
            <CFormInput
              type="text"
              label="Details"
              name="details"
              defaultValue={currentItem?.details}
            />
            <CFormSelect
              label="Client"
              name="client"
              defaultValue={currentItem?.client}
            >
              {clients.map((client) => (
                <option key={client.id} value={client.name}>
                  {client.name}
                </option>
              ))}
            </CFormSelect>
            <CFormInput
              type="date"
              label="Due Date"
              name="dueDate"
              defaultValue={currentItem?.dueDate}
            />
            <CFormSelect
              label="Status"
              name="status"
              defaultValue={currentItem?.status}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="In Progress">In Progress</option>
              <option value="Client Review">Client Review</option>
              <option value="Action Feedback">Action Feedback</option>
              <option value="Complete">Complete</option>
              <option value="On Hold">On Hold</option>
            </CFormSelect>

            <CModalFooter>
              <CButton
                className="close-button"
                onClick={() => setModalVisible(false)}
              >
                Close
              </CButton>
              <CButton className="submit-button" type="submit">
                Save Changes
              </CButton>
            </CModalFooter>
          </form>
        </CModalBody>
      </CModal>
    </CContainer>
  );
};

export default ProjectsList;
