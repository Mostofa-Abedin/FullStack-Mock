import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import "./admindashboard.css";

import "@coreui/coreui/dist/css/coreui.min.css";

import ProjectsList from "../adminDashboard/projectsList";
import ClientsList from "../adminDashboard/clientList";
import AnnouncementsList from "../adminDashboard/announcementList";

const AdminDashboard = ({ username }) => {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("authToken");

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [businesses, setBusinesses] = useState([]); // New state for businesses
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data once in AdminDashboard
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, clientsRes, announcementsRes, businessRes] = await Promise.all([
        fetch(`${baseUrl}/projects`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${baseUrl}/users`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${baseUrl}/announcements`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${baseUrl}/business`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);


      if (!projectsRes.ok || !clientsRes.ok || !announcementsRes.ok || !businessRes.ok) {
        throw new Error("Failed to fetch data");
      }

      setProjects((await projectsRes.json()).projects || []);
      setClients(await clientsRes.json());
      setAnnouncements((await announcementsRes.json()).announcements || []);
      setBusinesses((await businessRes.json()).businesses || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <CContainer fluid>
      <h2 className="dash-welcome-text">Welcome, {username || "Admin"}!</h2>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          {/* Manage Projects */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Manage Projects</h4>
            </CCardHeader>
            <CCardBody>
              <ProjectsList projects={projects} setProjects={setProjects} />
            </CCardBody>
          </CCard>

          {/* Manage Clients */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Manage Clients</h4>
            </CCardHeader>
            <CCardBody>
              <ClientsList 
                clients={clients} 
                setClients={setClients} 
                businesses={businesses} 
                setBusinesses={setBusinesses} 
              />
            </CCardBody>
          </CCard>

          {/* Manage Announcements */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Manage Announcements</h4>
            </CCardHeader>
            <CCardBody>
              <AnnouncementsList announcements={announcements} setAnnouncements={setAnnouncements} businesses = {businesses}/>
            </CCardBody>
          </CCard>
        </>
      )}
    </CContainer>
  );
};

export default AdminDashboard;