import React from "react";
import Header from "../../components/adminDashboard/adminHeader"; 
import Sidebar from "../../components/adminDashboard/adminSidebar"; 
import ClientsList from "../../components/adminDashboard/clientList";

import "./admindashboardpage.css"

const ClientListPage = () => {
  return (
    <div className="admin-dashboard-container">
      <Header />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-content">
          <ClientsList />
        </div>
      </div>
    </div>
  );
};

export default ClientListPage;
