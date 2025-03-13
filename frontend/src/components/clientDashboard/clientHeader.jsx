import React, { useState } from "react";
import {
  CHeader,
  CHeaderNav,
  CHeaderBrand,
  CNavItem,
  CNavLink,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react"; // Added CModal import
import CIcon from "@coreui/icons-react";
import { cilUser, cilLockLocked } from "@coreui/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ChangePassword from "../changePassword/ChangePassword"; // Import ChangePassword component
import "../clientDashboard/clientdashboard.css";

import Logo from "../../assets/images/magnetlabslogo_full.png"

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
      
    {/* Logo */}
    <div className="logo-container">
      <img src={ Logo } alt="Logo" className="logo" />
    </div>

    {/* Centered title */}
    <CHeaderBrand className="header-text">
      <strong>Client Dashboard</strong>
    </CHeaderBrand>

    {/* Navigation */}
    <CHeaderNav className="nav-buttons">
      <CNavItem>
        <CNavLink href="#" onClick={handleProfileClick} className="header-button">
          <CIcon icon={cilUser} className="nav-icon" />
          Profile
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="#" onClick={handleLogoutClick} className="header-button">
          <CIcon icon={cilLockLocked} className="nav-icon" />
          Logout
        </CNavLink>
      </CNavItem>
    </CHeaderNav>

    {/* Logout Modal */}
    <CModal visible={isModalVisible} onClose={handleCancelLogout}>
      <CModalHeader>Confirm Logout</CModalHeader>
      <CModalBody className="modal-text">
        Are you sure you want to log out? Your session will end.
      </CModalBody>
      <CModalFooter>
        <CButton className="modal-button" onClick={handleCancelLogout}>Cancel</CButton>
        <CButton className="modal-button-confirm" onClick={handleConfirmLogout}>Confirm</CButton>
      </CModalFooter>
    </CModal>

    {/* Change Password Modal */}
    {isPasswordChangeVisible && (
      <CModal visible={isPasswordChangeVisible} onClose={handleClosePasswordChange}>
        <CModalHeader>Your Profile</CModalHeader>
        <CModalBody>
          <ChangePassword role="admin" />
        </CModalBody>
        <CModalFooter>
          <CButton className="modal-button" onClick={handleClosePasswordChange}>Close</CButton>
        </CModalFooter>
      </CModal>
    )}

  </CHeader>
);
};
export default Header;
