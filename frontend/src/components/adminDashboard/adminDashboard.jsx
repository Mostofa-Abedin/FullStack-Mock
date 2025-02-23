import React, { useState } from "react";
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderBrand,
  CNavItem,
  CNavLink,
  CSidebar,
  CSidebarNav,
  CNavGroup,
  CNavTitle,
  CNavItem as CSidebarItem,
  CFooter,
  CRow,
  CCol,
  CButton
} from "@coreui/react";
import CIcon from "@coreui/icons-react";  
import { cilUser, cilLockLocked, cilFolderOpen, cilBell } from "@coreui/icons"; 
import '@coreui/coreui/dist/css/coreui.min.css'; 
import './admindashboard.css';  

const AdminDashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  
  // Example logged-in username (you can replace this with your login logic)
  const username = "John Doe"; // Replace with dynamic username
  
  // Example data
  const clients = [
    { id: 1, name: "Client One", email: "client1@example.com", phone: "123-456-7890" },
    { id: 2, name: "Client Two", email: "client2@example.com", phone: "987-654-3210" },
    { id: 3, name: "Client Three", email: "client3@example.com", phone: "456-789-0123" },
    { id: 4, name: "Client Four", email: "client4@example.com", phone: "321-654-9870" }
  ];

  const projects = [
    { id: 1, name: "Project One", status: "In Progress", client: "Client One" },
    { id: 2, name: "Project Two", status: "Completed", client: "Client Two" },
    { id: 3, name: "Project Three", status: "In Progress", client: "Client Three" },
    { id: 4, name: "Project Four", status: "Not Started", client: "Client Four" }
  ];

  const announcements = [
    { id: 1, title: "New Feature Launch", date: "2025-03-01" },
    { id: 2, title: "Maintenance Schedule", date: "2025-03-05" },
    { id: 3, title: "Client Survey", date: "2025-03-10" }
  ];

  return (
    <CContainer fluid className="admin-dashboard">
      {/* Header */}
      <CHeader
        position="sticky"
        className="header mb-4 px-3 d-flex justify-content-between align-items-center shadow-sm"
      >
        <CHeaderBrand href="#" className="brand text-white">
          <strong>Admin Dashboard</strong>
        </CHeaderBrand>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#" className="text-white">
              <CIcon icon={cilUser} className="me-2" /> {/* Use icon prop */}
              Profile
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#" className="text-white">
              <CIcon icon={cilLockLocked} className="me-2" /> {/* Use a different icon */}
              Logout
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CHeader>

      <CRow>
        {/* Sidebar */}
        <CCol md="2">
          <CSidebar visible={sidebarVisible} className="sidebar min-vh-100 text-white">
            {/* Logo in Sidebar */}
            <div className="sidebar-logo">
              <img src="path_to_logo.png" alt="Logo" />
            </div>

            <CSidebarNav>
              <CNavTitle className="text-white">Dashboard</CNavTitle>
              <CSidebarItem href="/dashboard" className="text-white">
                Overview
              </CSidebarItem>
              <CNavGroup toggler="Clients" className="text-white">
                <CSidebarItem href="/clients" className="text-white">
                  Manage Clients
                </CSidebarItem>
              </CNavGroup>
              <CNavGroup toggler="Projects" className="text-white">
                <CSidebarItem href="/projects" className="text-white">
                  Manage Projects
                </CSidebarItem>
              </CNavGroup>
              <CNavGroup toggler="Announcements" className="text-white">
                <CSidebarItem href="/announcements" className="text-white">
                  Make Announcements
                </CSidebarItem>
              </CNavGroup>
            </CSidebarNav>
          </CSidebar>
        </CCol>

        {/* Main Content */}
        <CCol md="10" className="p-4">
          <CButton
            color="primary"
            onClick={() => setSidebarVisible(!sidebarVisible)}
            className="mb-4"
          >
            {sidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
          </CButton>
          <h2 className="mt-3">Welcome, {username}</h2>
          <p>Dashboard content goes here. This is where you can manage everything related to the platform.</p>

          {/* Quick Stats Section */}
          <CRow className="mt-5">
            <CCol sm="4">
              <div className="card text-center p-3 shadow-sm">
                <h4>Total Clients</h4>
                <h5>{clients.length}</h5>
                <CButton color="info">View Clients</CButton>
              </div>
            </CCol>
            <CCol sm="4">
              <div className="card text-center p-3 shadow-sm">
                <h4>Active Projects</h4>
                <h5>{projects.length}</h5>
                <CButton color="info">View Projects</CButton>
              </div>
            </CCol>
            <CCol sm="4">
              <div className="card text-center p-3 shadow-sm">
                <h4>Announcements</h4>
                <h5>{announcements.length}</h5>
                <CButton color="info">View Announcements</CButton>
              </div>
            </CCol>
          </CRow>

          {/* Manage Clients Section with Mock Client Previews */}
          <CRow className="mt-5">
            <CCol>
              <div className="card-preview">
                <h3>Manage Clients</h3>
                <p>Preview of mock clients:</p>
                <CRow>
                  {clients.map((client) => (
                    <CCol sm="6" md="3" key={client.id} className="mb-3">
                      <div className="card p-3 text-center shadow-sm">
                        <h5>{client.name}</h5>
                        <p>{client.email}</p>
                        <p>{client.phone}</p>
                      </div>
                    </CCol>
                  ))}
                </CRow>
              </div>
            </CCol>
          </CRow>

          {/* Manage Projects Section with Mock Project Previews */}
          <CRow className="mt-4">
            <CCol>
              <div className="card-preview">
                <h3>Manage Projects</h3>
                <p>Preview of mock projects:</p>
                <CRow>
                  {projects.map((project) => (
                    <CCol sm="6" md="3" key={project.id} className="mb-3">
                      <div className="card p-3 text-center shadow-sm">
                        <h5>{project.name}</h5>
                        <p>Status: {project.status}</p>
                        <p>Client: {project.client}</p>
                      </div>
                    </CCol>
                  ))}
                </CRow>
              </div>
            </CCol>
          </CRow>

          {/* Make Announcements Section with Mock Announcements Previews */}
          <CRow className="mt-4">
            <CCol>
              <div className="card-preview">
                <h3>Make Announcements</h3>
                <p>Preview of mock announcements:</p>
                <CRow>
                  {announcements.map((announcement) => (
                    <CCol sm="6" md="3" key={announcement.id} className="mb-3">
                      <div className="card p-3 text-center shadow-sm">
                        <h5>{announcement.title}</h5>
                        <p>Date: {announcement.date}</p>
                      </div>
                    </CCol>
                  ))}
                </CRow>
              </div>
            </CCol>
          </CRow>
        </CCol>
      </CRow>

      {/* Footer */}
      <CFooter className="footer mt-auto">
        <div>Admin Dashboard - 2025</div>
      </CFooter>
    </CContainer>
  );
};

export default AdminDashboard;
