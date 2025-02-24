import React from "react";
import Header from "../../components/adminDashboard/adminHeader"; 
import Sidebar from "../../components/adminDashboard/adminSidebar"; 
import ProjectsList from "../../components/adminDashboard/projectsList";

import "./admindashboardpage.css"

const ClientListPage = () => {
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
