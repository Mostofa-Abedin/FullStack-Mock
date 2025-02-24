import { useState, useEffect } from "react";
import { CSidebar, CSidebarNav, CNavTitle, CNavItem as CSidebarItem, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";

const Sidebar = ({ sidebarVisible, toggleSidebar, isMobile }) => {
  return (
    <>
      {isMobile && (
        <CButton className="hamburger-menu" onClick={toggleSidebar}>
          <CIcon icon={cilMenu} />
        </CButton>
      )}
      <CSidebar visible={sidebarVisible} className="sidebar">
        <CSidebarNav>
          <CNavTitle className="sidebar-text">Overview</CNavTitle>
          <CSidebarItem href="/admin/clients" className="sidebar-text">
            Clients List
          </CSidebarItem>
          <CSidebarItem href="/admin/projects" className="sidebar-text">
            Projects List
          </CSidebarItem>
          <CSidebarItem href="/admin/announcements" className="sidebar-text">
            Announcements List
          </CSidebarItem>
        </CSidebarNav>
      </CSidebar>
    </>
  );
};

export default Sidebar;
