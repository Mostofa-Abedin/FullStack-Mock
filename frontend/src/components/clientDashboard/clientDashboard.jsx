import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import "./clientdashboard.css";

import "@coreui/coreui/dist/css/coreui.min.css";

const ClientDashboard = () => {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data once in ClientDashboard
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, announcementsRes] = await Promise.all([
        fetch(`${baseUrl}/projects`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${baseUrl}/announcements`, { headers: { Authorization: `Bearer ${token}` } }),
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

  return (
    <CContainer fluid>
      <h2 className="dash-welcome-text">Welcome to Your Dashboard!</h2>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          {/* Manage Projects */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>My Projects</h4>
            </CCardHeader>
            <CCardBody>
              <ul>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <li key={project.id} className="py-2 border-b">
                      {project.name}
                    </li>
                  ))
                ) : (
                  <p>No projects available</p>
                )}
              </ul>
              <CButton onClick={() => navigate("/projects")} className="mt-4">
                View All Projects
              </CButton>
            </CCardBody>
          </CCard>

          {/* Manage Announcements */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Announcements</h4>
            </CCardHeader>
            <CCardBody>
              <ul>
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <li key={announcement.id} className="py-2 border-b">
                      {announcement.title}
                    </li>
                  ))
                ) : (
                  <p>No announcements available</p>
                )}
              </ul>
              <CButton onClick={() => navigate("/announcements")} className="mt-4">
                View All Announcements
              </CButton>
            </CCardBody>
          </CCard>
        </>
      )}
    </CContainer>
  );
};

export default ClientDashboard;
