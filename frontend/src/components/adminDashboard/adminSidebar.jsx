import { useState, useEffect } from "react";
import { CSidebar, CSidebarNav, CNavTitle, CNavItem as CSidebarItem, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";

const Sidebar = ({ sidebarVisible, toggleSidebar }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);  // Always visible on desktop
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Detect mobile

  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth <= 768;
      setIsMobile(isCurrentlyMobile);

      // Ensure the sidebar is always visible on desktop
      if (!isCurrentlyMobile) {
        setIsSidebarVisible(true); // Sidebar should always be visible on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on mount to handle initial load
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update the sidebar visibility when the parent passes a new prop
  useEffect(() => {
    if (isMobile) {
      setIsSidebarVisible(sidebarVisible); // Use the passed prop for mobile view
    }
  }, [sidebarVisible, isMobile]);

  const handleToggle = () => {
    if (isMobile) {
      setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility only on mobile
      toggleSidebar(); // Notify parent of the state change
    }
  };

  const sidebarStyles = {
    transition: 'transform 0.3s ease',
    transform: isMobile && !isSidebarVisible ? 'translateX(-100%)' : 'translateX(0)', // Slide in/out effect on mobile
    width: isMobile ? '250px' : 'auto',  // Sidebar width for mobile
  };

  const hamburgerMenuStyles = {
    display: isMobile ? 'block' : 'none',  // Show hamburger only on mobile
    position: 'absolute',
    zIndex: 1020,
    backgroundColor: '#F3A83C',
    color: 'white',
    border: 'none',
    padding: '10px',
    marginTop: '-44px',
  };

  return (
    <>
      {isMobile && (
        <CButton style={hamburgerMenuStyles} onClick={handleToggle}>
          <CIcon icon={cilMenu} />
        </CButton>
      )}

      <CSidebar style={sidebarStyles} visible={isSidebarVisible}>
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
