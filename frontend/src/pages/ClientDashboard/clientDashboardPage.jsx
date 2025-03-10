import React, { useEffect } from "react"; 
import ClientDashboard from "../../components/clientDashboard/clientDashboard";
import Header from "../../components/adminDashboard/adminHeader"; 
import Sidebar from "../../components/adminDashboard/adminSidebar"; 
import "./clientdashboardpage.css"

const ClientDashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the page loads
  }, []);
  return (
    <div className="admin-dashboard-container">
      <Header />
        <div className="dashboard-content">
          <ClientDashboard />
        </div>
    </div>
  );
};

export default ClientDashboardPage;
