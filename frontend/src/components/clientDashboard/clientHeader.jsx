import { CHeader, CHeaderNav, CHeaderBrand, CNavItem, CNavLink } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilUser, cilLockLocked } from "@coreui/icons";

const Header = () => {
  return (
    <CHeader position="sticky" className="header">
      <CHeaderBrand className="header-text" href="/admin/dashboard">
        <strong>Client Dashboard</strong>
      </CHeaderBrand>
      <CHeaderNav>
        <CNavItem>
          <CNavLink href="#" className="profile">
            <CIcon icon={cilUser} className="profile-icon" />
            Profile
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#" className="logout">
            <CIcon icon={cilLockLocked} className="profile-icon" />
            Logout
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
    </CHeader>
  );
};

export default Header;