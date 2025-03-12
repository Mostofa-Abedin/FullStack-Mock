import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CContainer,
  CNavItem as CSidebarItem,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "../adminDashboard/admindashboard.css";

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("authToken");

  // Retrieve userId from localStorage or from a decoded JWT token
  const userId = localStorage.getItem("userId"); // Assuming the userId is stored in localStorage.

  useEffect(() => {
    if (userId) {
      fetchData();
    } else {
      setError("User not found.");
      setLoading(false);
    }
  }, [userId]);

  const fetchData = async () => {
    try {
      const [projectsRes, announcementsRes] = await Promise.all([
        fetch(`${baseUrl}/projects/${userId}`, { headers: { Authorization: `Bearer ${token}` } }),  // Client-specific project data
        fetch(`${baseUrl}/announcements`, { headers: { Authorization: `Bearer ${token}` } }),  // All announcements (change if needed)
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
                    </li>
                  ))
                ) : (
                  <p>No projects available</p>
                )}
              </ul>
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
                    </li>
                  ))
                ) : (
                  <p>No announcements available</p>
                )}
              </ul>
            </CCardBody>
          </CCard>
        </>
      )}
    </div>
  );
};

export default ClientDashboard;
