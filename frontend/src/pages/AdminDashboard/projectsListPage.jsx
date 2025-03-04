import React, { useEffect } from "react";
import Header from "../../components/adminDashboard/adminHeader"; 
import Sidebar from "../../components/adminDashboard/adminSidebar"; 
import ProjectsList from "../../components/adminDashboard/projectsList";

import "./admindashboardpage.css"

const ClientListPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the page loads
  }, []);
  return (
    <div className="admin-dashboard-container">
      <Header />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-content">
          <ProjectsList />
        </div>
      </div>
    </div>
  );
};

export default ClientListPage;
