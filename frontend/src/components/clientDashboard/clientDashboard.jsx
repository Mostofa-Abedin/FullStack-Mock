import { useState, useEffect } from "react";
import axios from "axios";
import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CFormTextarea,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./clientdashboard.css";

const ClientDashboard = ({ username }) => {
  const [clientDetails, setClientDetails] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    address: "",
    businessType: "",
    website: "",
  });

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project Alpha",
      details: "Details about Project Alpha",
      dueDate: "2025-03-01",
      status: "Upcoming",
      feedback: [],
    },
    {
      id: 2,
      name: "Project Beta",
      details: "Details about Project Beta",
      dueDate: "2025-04-01",
      status: "In Progress",
      feedback: [],
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentDetails, setCurrentDetails] = useState(clientDetails);
  const [projectModalVisible, setProjectModalVisible] = useState(false);
  const [editProjectModalVisible, setEditProjectModalVisible] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    details: "",
    dueDate: "",
    status: "Upcoming",
  });
  const [currentProject, setCurrentProject] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [feedback, setFeedback] = useState(""); // State for storing feedback
  const [showFeedbackConfirmation, setShowFeedbackConfirmation] =
    useState(false); // State for feedback confirmation modal

  // Fetch business details from the backend
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await axios.get("/api/business/details", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is saved in local storage
          },
        });
        setClientDetails({
          name: response.data.name,
          businessName: response.data.businessName,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address, // Added address
          businessType: response.data.businessType, // Added business type
          website: response.data.website, // Added website
        });
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    };

    fetchBusinessDetails();
  }, []); // Empty dependency array to run once on component mount

  const handleClientUpdate = (e) => {
    e.preventDefault();
    const { name, businessName, email, phone, address, businessType, website } = e.target.elements;
    setClientDetails({
      name: name.value,
      businessName: businessName.value,
      email: email.value,
      phone: phone.value,
      address: address.value, // Added address update
      businessType: businessType.value, // Added business type update
      website: website.value, // Added website update
    });
    setModalVisible(false);
  };

  const handleProjectAdd = (e) => {
    e.preventDefault();
    setProjects([...projects, { id: Date.now(), ...newProject }]);
    setProjectModalVisible(false);
    setNewProject({ name: "", details: "", dueDate: "", status: "Upcoming" });
  };

  const handleProjectEdit = (e) => {
    e.preventDefault();
    setProjects(
      projects.map((project) =>
        project.id === currentProject.id ? currentProject : project
      )
    );
    setEditProjectModalVisible(false);
    setCurrentProject(null);
  };

  const handleProjectDelete = () => {
    setProjects(
      projects.filter((project) => project.id !== projectToDelete.id)
    );
    setShowDeleteConfirmation(false);
    setProjectToDelete(null);
  };

  const handleStatusChange = (projectId, newStatus) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    );
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value); // Store the feedback entered by the user
  };

  const submitFeedback = (projectId) => {
    if (!feedback) {
      alert("Please provide feedback before submitting.");
      return;
    }

    const timestamp = new Date().toLocaleString(); // Get current timestamp
    const feedbackData = { feedback, timestamp };

    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              feedback: [...project.feedback, feedbackData],
            }
          : project
      )
    );
    setFeedback(""); // Clear the feedback input after submission
    setShowFeedbackConfirmation(false); // Close the confirmation modal
  };

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
      <CRow>
        <CCol md="10" className="p-4">
          <h2 className="dash-welcome-text">
            Welcome, {username ? username : "Client"}!
          </h2>

          {/* Client Business Details Section */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Your Business Details</h4>
              <CButton onClick={() => setModalVisible(true)}>
                Edit Details
              </CButton>
            </CCardHeader>
            <CCardBody>
              <p>
                <strong>Name:</strong> {clientDetails.name}
              </p>
              <p>
                <strong>Business Name:</strong> {clientDetails.businessName}
              </p>
              <p>
                <strong>Email:</strong> {clientDetails.email}
              </p>
              <p>
                <strong>Phone:</strong> {clientDetails.phone}
              </p>
              <p>
                <strong>Address:</strong> {clientDetails.address}
              </p>
              <p>
                <strong>Business Type:</strong> {clientDetails.businessType}
              </p>
              <p>
                <strong>Website:</strong> {clientDetails.website}
              </p>
            </CCardBody>
          </CCard>

          {/* Projects Section */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Your Projects</h4>
              <CButton onClick={() => setProjectModalVisible(true)}>
                Add Project
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <CCol sm="4" key={project.id}>
                      <div
                        className={`dash-card p-3 shadow-sm ${getStatusColor(project.status)}`}
                      >
                        <h5>{project.name}</h5>
                        <p>Details: {project.details}</p>
                        <p>
                          <strong>Due Date:</strong>{" "}
                          {new Date(project.dueDate).toLocaleDateString("en-GB")}
                        </p>
                        <p>
                          <strong>Status:</strong>
                          <CFormSelect
                            value={project.status}
                            onChange={(e) => handleStatusChange(project.id, e.target.value)}
                          >
                            <option value="Upcoming">Upcoming</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Client Review">Client Review</option>
                            <option value="Action Feedback">Action Feedback</option>
                            <option value="Complete">Complete</option>
                            <option value="On Hold">On Hold</option>
                          </CFormSelect>
                        </p>

                        {/* Feedback Section (Only shows when Status is 'Client Review') */}
                        {project.status === "Client Review" && (
                          <div>
                            <CFormTextarea
                              label="Leave Client Feedback"
                              value={feedback}
                              onChange={handleFeedbackChange}
                              rows="3"
                              placeholder="Enter your feedback here"
                            />
                            <CButton
                              color="success"
                              onClick={() => setShowFeedbackConfirmation(true)}
                            >
                              Submit Feedback
                            </CButton>
                            {project.feedback.length > 0 && (
                              <div>
                                <h6>Admin Feedback:</h6>
                                {project.feedback.map((feedbackItem, index) => (
                                  <div key={index}>
                                    <p>{feedbackItem.feedback}</p>
                                    <small>{feedbackItem.timestamp}</small>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        <CButton
                          color="primary"
                          onClick={() => {
                            setCurrentProject(project);
                            setEditProjectModalVisible(true);
                          }}
                        >
                          Edit
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => {
                            setShowDeleteConfirmation(true);
                            setProjectToDelete(project);
                          }}
                        >
                          Delete
                        </CButton>
                      </div>
                    </CCol>
                  ))
                ) : (
                  <p>No projects found. Add a new project to get started.</p>
                )}
              </CRow>
            </CCardBody>
          </CCard>

          {/* Modal for Editing Business Details */}
          <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader>
              <CModalTitle>Edit Business Details</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <form onSubmit={handleClientUpdate}>
                <CFormInput
                  type="text"
                  label="Name"
                  name="name"
                  defaultValue={clientDetails.name}
                  required
                />
                <CFormInput
                  type="text"
                  label="Business Name"
                  name="businessName"
                  defaultValue={clientDetails.businessName}
                  required
                />
                <CFormInput
                  type="email"
                  label="Email"
                  name="email"
                  defaultValue={clientDetails.email}
                  required
                />
                <CFormInput
                  type="text"
                  label="Phone"
                  name="phone"
                  defaultValue={clientDetails.phone}
                  required
                />
                <CFormInput
                  type="text"
                  label="Address"
                  name="address"
                  defaultValue={clientDetails.address}
                  required
                />
                <CFormInput
                  type="text"
                  label="Business Type"
                  name="businessType"
                  defaultValue={clientDetails.businessType}
                  required
                />
                <CFormInput
                  type="text"
                  label="Website"
                  name="website"
                  defaultValue={clientDetails.website}
                  required
                />
                <CModalFooter>
                  <CButton type="submit" color="primary">
                    Save Changes
                  </CButton>
                  <CButton
                    color="secondary"
                    onClick={() => setModalVisible(false)}
                  >
                    Cancel
                  </CButton>
                </CModalFooter>
              </form>
            </CModalBody>
          </CModal>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ClientDashboard;
