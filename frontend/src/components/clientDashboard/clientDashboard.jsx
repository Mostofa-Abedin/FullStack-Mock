import { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import {
  CContainer,
  CNavItem as CSidebarItem,
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
import "../adminDashboard/admindashboard.css";

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showCreateAnnouncementModal, setShowCreateAnnouncementModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, announcementsRes] = await Promise.all([
        fetch(`${baseUrl}/projects`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${baseUrl}/announcements`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (!projectsRes.ok || !announcementsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      setProjects((await projectsRes.json()).projects || []);
      setAnnouncements((await announcementsRes.json()).announcements || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Create Project function
  const createProject = async () => {
    try {
      const response = await fetch(`${baseUrl}/projects`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newProjectName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      setNewProjectName('');
      setShowCreateProjectModal(false);
      fetchData(); // Refresh data after adding
    } catch (error) {
      setError(error.message);
    }
  };

  // Create Announcement function
  const createAnnouncement = async () => {
    try {
      const response = await fetch(`${baseUrl}/announcements`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newAnnouncementTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to create announcement");
      }

      setNewAnnouncementTitle('');
      setShowCreateAnnouncementModal(false);
      fetchData(); // Refresh data after adding
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete Project function
  const deleteProject = async (projectId) => {
    try {
      const response = await fetch(`${baseUrl}/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      fetchData(); // Refresh data after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete Announcement function
  const deleteAnnouncement = async (announcementId) => {
    try {
      const response = await fetch(`${baseUrl}/announcements/${announcementId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete announcement");
      }

      fetchData(); // Refresh data after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        <p>Loading dashboard...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Projects Section */}
          <CCard>
            <CCardBody>
              <h2 className="text-xl font-bold flex items-center gap-2">
                Projects
              </h2>
              <ul>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <li key={project.id} className="py-2 border-b">
                      {project.name}
                      <Button onClick={() => deleteProject(project.id)} className="ml-2 text-red-500">
                        Delete
                      </Button>
                    </li>
                  ))
                ) : (
                  <p>No projects available</p>
                )}
              </ul>
              <CButton onClick={() => setShowCreateProjectModal(true)} className="mt-4">
                Add New Project
              </CButton>
            </CCardBody>
          </CCard>

          {/* Announcements Section */}
          <CCard>
            <CCardBody>
              <h2 className="text-xl font-bold flex items-center gap-2">
                Announcements
              </h2>
              <ul>
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <li key={announcement.id} className="py-2 border-b">
                      {announcement.title}
                      <Button onClick={() => deleteAnnouncement(announcement.id)} className="ml-2 text-red-500">
                        Delete
                      </Button>
                    </li>
                  ))
                ) : (
                  <p>No announcements available</p>
                )}
              </ul>
              <CButton onClick={() => setShowCreateAnnouncementModal(true)} className="mt-4">
                Add New Announcement
              </CButton>
            </CCardBody>
          </CCard>
        </>
      )}

      {/* Create Project Modal */}
      <CModal visible={showCreateProjectModal} onClose={() => setShowCreateProjectModal(false)}>
        <CModalHeader>
          <CModalTitle>Create New Project</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            placeholder="Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton onClick={createProject}>Save</CButton>
          <CButton color="secondary" onClick={() => setShowCreateProjectModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Create Announcement Modal */}
      <CModal visible={showCreateAnnouncementModal} onClose={() => setShowCreateAnnouncementModal(false)}>
        <CModalHeader>
          <CModalTitle>Create New Announcement</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            placeholder="Announcement Title"
            value={newAnnouncementTitle}
            onChange={(e) => setNewAnnouncementTitle(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton onClick={createAnnouncement}>Save</CButton>
          <CButton color="secondary" onClick={() => setShowCreateAnnouncementModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default ClientDashboard;
