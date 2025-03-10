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
  CFormSelect,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,

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

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Announcement 1",
      content: "Content of announcement 1",
      date: "2025-03-05",
    },
    {
      id: 2,
      title: "Announcement 2",
      content: "Content of announcement 2",
      date: "2025-03-10",
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
  const [feedback, setFeedback] = useState("");
  const [showFeedbackConfirmation, setShowFeedbackConfirmation] = useState(false);

  // Announcements states
  const [announcementModalVisible, setAnnouncementModalVisible] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    date: "",
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [announcementAction, setAnnouncementAction] = useState(null);

  // Fetch business details from the backend
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await axios.get("/api/business/details", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClientDetails({
          name: response.data.name,
          businessName: response.data.businessName,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
          businessType: response.data.businessType,
          website: response.data.website,
        });
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    };

    fetchBusinessDetails();
  }, []);

  const handleClientUpdate = (e) => {
    e.preventDefault();
    const { name, businessName, email, phone, address, businessType, website } = e.target.elements;
    setClientDetails({
      name: name.value,
      businessName: businessName.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      businessType: businessType.value,
      website: website.value,
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
    setProjects(projects.map((project) => (project.id === currentProject.id ? currentProject : project)));
    setEditProjectModalVisible(false);
    setCurrentProject(null);
  };

  const handleProjectDelete = () => {
    setProjects(projects.filter((project) => project.id !== projectToDelete.id));
    setShowDeleteConfirmation(false);
    setProjectToDelete(null);
  };

  const handleStatusChange = (projectId, newStatus) => {
    setProjects(projects.map((project) => (project.id === projectId ? { ...project, status: newStatus } : project)));
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const submitFeedback = (projectId) => {
    if (!feedback) {
      alert("Please provide feedback before submitting.");
      return;
    }

    const timestamp = new Date().toLocaleString();
    const feedbackData = { feedback, timestamp };

    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, feedback: [...project.feedback, feedbackData] } : project
      )
    );
    setFeedback("");
    setShowFeedbackConfirmation(false);
  };

  // Announcement handlers

  // Delete announcement (for delete confirmation)
  const handleAnnouncementDelete = (announcementId) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== announcementId));
  };

  // Modified add handler (called after preview confirmation)
  const handleAnnouncementAdd = () => {
    setAnnouncements([...announcements, { id: Date.now(), ...newAnnouncement }]);
    setNewAnnouncement({ title: "", content: "", date: "" });
  };

  // Modified edit handler (called after preview confirmation)
  const handleAnnouncementEdit = () => {
    setAnnouncements(
      announcements.map((announcement) =>
        announcement.id === currentAnnouncement.id ? { ...announcement, ...newAnnouncement } : announcement
      )
    );
    setCurrentAnnouncement(null);
    setNewAnnouncement({ title: "", content: "", date: "" });
  };

  // Executes the final action based on the type: delete, edit, or add
  const executeAnnouncementAction = () => {
    if (announcementAction === "delete") {
      handleAnnouncementDelete(currentAnnouncement.id);
    } else if (announcementAction === "edit") {
      handleAnnouncementEdit();
    } else if (announcementAction === "add") {
      handleAnnouncementAdd();
    }
    setShowConfirmationModal(false);
    setAnnouncementAction(null);
    setCurrentAnnouncement(null);
  };

  // For delete confirmation (existing functionality)
  const confirmAnnouncementAction = (action, announcement) => {
    setAnnouncementAction(action);
    setCurrentAnnouncement(announcement);
    setShowConfirmationModal(true);
  };

  // For add/edit preview confirmation
  const confirmAnnouncementPreview = () => {
    if (currentAnnouncement) {
      setAnnouncementAction("edit");
    } else {
      setAnnouncementAction("add");
    }
    setAnnouncementModalVisible(false);
    setShowConfirmationModal(true);
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
              <CButton onClick={() => setModalVisible(true)}>Edit Details</CButton>
            </CCardHeader>
            <CCardBody>
              <p><strong>Name:</strong> {clientDetails.name}</p>
              <p><strong>Business Name:</strong> {clientDetails.businessName}</p>
              <p><strong>Email:</strong> {clientDetails.email}</p>
              <p><strong>Phone:</strong> {clientDetails.phone}</p>
              <p><strong>Address:</strong> {clientDetails.address}</p>
              <p><strong>Business Type:</strong> {clientDetails.businessType}</p>
              <p><strong>Website:</strong> {clientDetails.website}</p>
            </CCardBody>
          </CCard>

          {/* Projects Section */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Your Projects</h4>
              <CButton onClick={() => setProjectModalVisible(true)}>Add Project</CButton>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {projects.map((project) => (
                  <CCol sm="4" key={project.id}>
                    <div className={`dash-card p-3 shadow-sm ${getStatusColor(project.status)}`}>
                      <h5>{project.name}</h5>
                      <p>Details: {project.details}</p>
                      <p>
                        <strong>Due Date:</strong>{" "}
                        {new Date(project.dueDate).toLocaleDateString("en-GB")}
                      </p>
                      <CButton
                        color="warning"
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
                          setProjectToDelete(project);
                          setShowDeleteConfirmation(true);
                        }}
                      >
                        Delete
                      </CButton>
                    </div>
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>

          {/* Announcements Section */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Announcements</h4>
              <CButton
                onClick={() => {
                  setCurrentAnnouncement(null);
                  setNewAnnouncement({ title: "", content: "", date: "" });
                  setAnnouncementModalVisible(true);
                }}
              >
                Add Announcement
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {announcements.map((announcement) => (
                  <CCol sm="4" key={announcement.id}>
                    <div className="dash-card p-3 shadow-sm">
                      <h5>{announcement.title}</h5>
                      <p>{announcement.content}</p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(announcement.date).toLocaleDateString("en-GB")}
                      </p>
                      <CButton
                        color="warning"
                        onClick={() => {
                          setCurrentAnnouncement(announcement);
                          setNewAnnouncement({
                            title: announcement.title,
                            content: announcement.content,
                            date: announcement.date,
                          });
                          setAnnouncementModalVisible(true);
                        }}
                      >
                        Edit
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => confirmAnnouncementAction("delete", announcement)}
                      >
                        Delete
                      </CButton>
                    </div>
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Add/Edit Announcement Modal */}
      <CModal
        visible={announcementModalVisible}
        onClose={() => setAnnouncementModalVisible(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>
            {currentAnnouncement ? "Edit Announcement" : "Add Announcement"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            label="Title"
            value={newAnnouncement.title}
            onChange={(e) =>
              setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
            }
          />
          <CFormTextarea
            label="Content"
            value={newAnnouncement.content}
            onChange={(e) =>
              setNewAnnouncement({ ...newAnnouncement, content: e.target.value })
            }
          />
          <CFormInput
            label="Date"
            type="date"
            value={newAnnouncement.date}
            onChange={(e) =>
              setNewAnnouncement({ ...newAnnouncement, date: e.target.value })
            }
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setAnnouncementModalVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={confirmAnnouncementPreview}>
            Preview & Confirm
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Confirmation Modal for Announcements (Add/Edit/Delete Preview) */}
      <CModal
        visible={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>
            {announcementAction === "delete"
              ? "Confirm Deletion"
              : announcementAction === "edit"
              ? "Confirm Edit"
              : "Confirm Addition"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {announcementAction === "delete" ? (
            <p>Are you sure you want to delete this announcement?</p>
          ) : (
            <>
              <h5>{newAnnouncement.title}</h5>
              <p>{newAnnouncement.content}</p>
              <p>
                <strong>Date:</strong>{" "}
                {newAnnouncement.date
                  ? new Date(newAnnouncement.date).toLocaleDateString("en-GB")
                  : ""}
              </p>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={executeAnnouncementAction}>
            Confirm{" "}
            {announcementAction === "delete"
              ? "Deletion"
              : announcementAction === "edit"
              ? "Edit"
              : "New Announcement"}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirmation Modal for Projects */}
      <CModal
        visible={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete this project?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDeleteConfirmation(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleProjectDelete}>
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};


export default ClientDashboard;
