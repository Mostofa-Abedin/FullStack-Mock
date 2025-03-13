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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilUser, cilLockLocked } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../changePassword/ChangePassword";
import "../adminDashboard/admindashboard.css";

import Logo from "../../assets/images/magnetlabslogo_full.png";

const Header = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);

  const handleLogoutClick = () => setIsModalVisible(true);
  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    setIsModalVisible(false);
    navigate("/login");
  };
  const handleCancelLogout = () => setIsModalVisible(false);
  const handleProfileClick = () => setIsPasswordChangeVisible(true);
  const handleClosePasswordChange = () => setIsPasswordChangeVisible(false);

  return (
    <CHeader className="header">
      {/* Logo */}
      <a href="/" className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </a>

      {/* Centered title */}
      <CHeaderBrand className="header-text">
        <strong>Admin Dashboard</strong>
      </CHeaderBrand>

      {/* Navigation */}
      <CHeaderNav className="nav-buttons">
        <CNavItem>
          <CNavLink
            href="#"
            onClick={handleProfileClick}
            className="header-button"
          >
            <CIcon icon={cilUser} className="nav-icon" />
            Profile
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#"
            onClick={handleLogoutClick}
            className="header-button"
          >
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
          <CButton className="modal-button" onClick={handleCancelLogout}>
            Cancel
          </CButton>
          <CButton
            className="modal-button-confirm"
            onClick={handleConfirmLogout}
          >
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Change Password Modal */}
      {isPasswordChangeVisible && (
        <CModal
          visible={isPasswordChangeVisible}
          onClose={handleClosePasswordChange}
        >
          <CModalHeader>Your Profile</CModalHeader>
          <CModalBody>
            <ChangePassword role="admin" />
          </CModalBody>
          <CModalFooter>
            <CButton
              className="modal-button"
              onClick={handleClosePasswordChange}
            >
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </CHeader>
  );
};

export default Header;
