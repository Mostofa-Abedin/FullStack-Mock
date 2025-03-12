import React, { useState } from "react";
import { CHeader, CHeaderNav, CHeaderBrand, CNavItem, CNavLink, CModal, CModalHeader, CModalBody, CModalFooter, CButton } from "@coreui/react"; // Added CModal import
import CIcon from "@coreui/icons-react";
import { cilUser, cilLockLocked } from "@coreui/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ChangePassword from "../changePassword/ChangePassword"; // Import ChangePassword component

const Header = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false); // New state for showing change password component

  // Handle logout button click to show confirmation modal
  const handleLogoutClick = () => {
    setIsModalVisible(true);
  };

  // Handle confirmation of logout
  const handleConfirmLogout = () => {
    // Clear authentication (e.g., token)
    localStorage.removeItem("authToken");
    // Close modal
    setIsModalVisible(false);
    // Navigate to login page
    navigate("/login");
  };

  // Handle cancel logout
  const handleCancelLogout = () => {
    setIsModalVisible(false);
  };

  // Handle profile click to show change password modal
  const handleProfileClick = () => {
    setIsPasswordChangeVisible(true); // Show the change password component
  };

  // Handle closing the change password modal
  const handleClosePasswordChange = () => {
    setIsPasswordChangeVisible(false); // Close the change password component
  };

  return (
    <CHeader className="header">
      <CHeaderBrand className="header-text" href="/client/dashboard">
        <strong>Client Dashboard</strong>
      </CHeaderBrand>
      <CHeaderNav>
        <CNavItem>
          <CNavLink href="#" className="profile" onClick={handleProfileClick}>
            <CIcon icon={cilUser} className="profile-icon" />
            Profile
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#" className="logout" onClick={handleLogoutClick}>
            <CIcon icon={cilLockLocked} className="profile-icon" />
            Logout
          </CNavLink>
        </CNavItem>
      </CHeaderNav>

      {/* Logout Confirmation Modal */}
      <CModal visible={isModalVisible} onClose={handleCancelLogout}>
        <CModalHeader>Confirm Logout</CModalHeader>
        <CModalBody>
          Are you sure you want to log out? Your session will end.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCancelLogout}>Cancel</CButton>
          <CButton color="primary" onClick={handleConfirmLogout}>Confirm</CButton>
        </CModalFooter>
      </CModal>

      {/* Conditionally render ChangePassword component as a modal */}
      {isPasswordChangeVisible && (
        <CModal visible={isPasswordChangeVisible} onClose={handleClosePasswordChange}>
          <CModalHeader>Your Profile</CModalHeader>
          <CModalBody>
            <ChangePassword role="client" /> {/* Pass the role to change password */}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={handleClosePasswordChange}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </CHeader>
  );
};

export default Header;
