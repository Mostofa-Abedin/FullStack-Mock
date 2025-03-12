import React, { useEffect } from "react"; 
import AdminDashboard from "../../components/adminDashboard/adminDashboard";
import Header from "../../components/adminDashboard/adminHeader"; 
import "./admindashboardpage.css"

const AdminDashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the page loads
  }, []);
  return (
    <div className="admin-dashboard-container">
      <Header />
        <div className="dashboard-content">
          <AdminDashboard />
        </div>
      </div>
  );
};

export default AdminDashboardPage;
