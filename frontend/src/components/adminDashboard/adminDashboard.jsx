import { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./admindashboard.css";

import ProjectsList from "../adminDashboard/projectsList";
import ClientsList from "../adminDashboard/clientList";
import AnnouncementsList from "../adminDashboard/announcementList";

const AdminDashboard = ({ username }) => {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("authToken");

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [formSection, setFormSection] = useState("");

  // Fetch Projects, Clients, and Announcements from Backend
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, clientsRes, announcementsRes] = await Promise.all([
        fetch(`${baseUrl}/projects`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${baseUrl}/users`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${baseUrl}/announcements`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (!projectsRes.ok || !clientsRes.ok || !announcementsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const projectsData = await projectsRes.json();
      const clientsData = await clientsRes.json();
      const announcementsData = await announcementsRes.json();

      setProjects(projectsData.projects || []);
      setClients(clientsData.users || []);
      setAnnouncements(announcementsData.announcements || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Handle Delete Item
  const handleDelete = async (id, section) => {
    try {
      const response = await fetch(`${baseUrl}/${section}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      if (section === "projects") {
        setProjects((prev) => prev.filter((item) => item._id !== id));
      } else if (section === "users") {
        setClients((prev) => prev.filter((item) => item._id !== id));
      } else {
        setAnnouncements((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle Save (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newItem = {
      name: formData.get("name"),
      details: formData.get("details"),
      clientId: formData.get("client"),
      dueDate: formData.get("dueDate"),
      status: formData.get("status"),
    };

    try {
      let response;
      if (modalType === "edit") {
        response = await fetch(`${baseUrl}/${formSection}/${currentItem._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newItem),
        });
      } else {
        response = await fetch(`${baseUrl}/${formSection}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newItem),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save item");
      }

      fetchData(); // Refresh data
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <CContainer fluid>
      <h2 className="dash-welcome-text">Welcome, {username ? username : "Admin"}!</h2>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          {/* Manage Clients */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Manage Clients</h4>
              <CButton
                className="dash-add-button"
                onClick={() => {
                  setFormSection("users");
                  setModalType("add");
                  setCurrentItem(null);
                  setModalVisible(true);
                }}
              >
                Add Client
              </CButton>
            </CCardHeader>
            <CCardBody>
              <ClientsList clients={clients} />
            </CCardBody>
          </CCard>

          {/* Manage Projects */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Manage Projects</h4>
              <CButton
                className="dash-add-button"
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
              <ProjectsList projects={projects} />
            </CCardBody>
          </CCard>

          {/* Manage Announcements */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Manage Announcements</h4>
              <CButton
                className="dash-add-button"
                onClick={() => {
                  setFormSection("announcements");
                  setModalType("add");
                  setCurrentItem(null);
                  setModalVisible(true);
                }}
              >
                Add Announcement
              </CButton>
            </CCardHeader>
            <CCardBody>
              <AnnouncementsList announcements={announcements} />
            </CCardBody>
          </CCard>
        </>
      )}

      {/* Modal for Add/Edit */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            {modalType === "edit" ? `Edit ${formSection}` : `Add ${formSection}`}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={handleSubmit}>
            <CFormInput type="text" label="Name" name="name" defaultValue={currentItem?.name} />
            {formSection === "projects" && (
              <>
                <CFormInput type="text" label="Details" name="details" defaultValue={currentItem?.details} />
                <CFormSelect label="Client" name="client" defaultValue={currentItem?.clientId}>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormInput type="date" label="Due Date" name="dueDate" defaultValue={currentItem?.dueDate} />
                <CFormSelect label="Status" name="status" defaultValue={currentItem?.status}>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </CFormSelect>
              </>
            )}
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

export default AdminDashboard;
