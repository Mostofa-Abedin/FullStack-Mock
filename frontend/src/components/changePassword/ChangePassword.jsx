import { useState } from "react";
import { CButton } from "@coreui/react"; // Removed CLabel
import { useNavigate } from "react-router-dom";
import "./changepassword.css"

const ChangePassword = ({ role }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
    // Assume we have a backend API endpoint for changing password
    try {
      const response = await fetch(`${baseUrl}/users/change-password`, {
        method: "PATCH", // use PATCH for updates
        body: JSON.stringify({ currentPassword, newPassword }),
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("authToken")}` },
      });
      

      if (response.ok) {
        navigate(role === "admin" ? "/admin/dashboard" : "/client/dashboard");
      } else {
        setErrorMessage("Failed to change password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="form-control" // Added Bootstrap class for styling
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="form-control" // Added Bootstrap class for styling
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-control" // Added Bootstrap class for styling
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <CButton type="submit" className="dash-submit-button">Change Password</CButton>
      </form>
    </div>
  );
};

export default ChangePassword;
