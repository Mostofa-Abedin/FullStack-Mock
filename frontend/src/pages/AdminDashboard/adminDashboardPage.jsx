import React, { useEffect } from "react";
import AdminDashboard from "../../components/adminDashboard/adminDashboard";
import Header from "../../components/adminDashboard/adminHeader";
import { useNavigate } from "react-router-dom"; 
import "./admindashboardpage.css";


const AdminDashboardPage = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the page loads
  }, []);

  // Logout handler
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Clear authentication (e.g., token)
      localStorage.removeItem("authToken"); 
      // Redirect to login page (or home)
      navigate("/login"); // Use navigate for redirection in React Router v6
    }
  };

  // Profile button handler (for changing password)
  const handleProfileClick = () => {
    navigate("/change-password");  // Navigate to change password page or modal
  };

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
