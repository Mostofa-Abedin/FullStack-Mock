import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import magnetLogo from "../../assets/images/magnet_bg_removed.png";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu
  };

  return (
    <nav className="home-navbar">
      {/* Logo and Name */}
      <Link to="/" className="logo">
        <img src={magnetLogo} alt="Magnet Logo" className="logo-img" />
        <span className="logo-text">Magnet Labs™</span>
      </Link>

      {/* Hamburger Menu Button */}
      <button className="home-mobile-menu" data-testid="mobile-menu" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links (only visible when isOpen is true) */}
      <div className={`home-nav-links ${isOpen ? "open" : ""}`} data-testid="nav-links">
        <NavLink
          to="/services"
          className={({ isActive }) => (isActive ? "home-nav-link-active" : "home-nav-link")}
          onClick={handleLinkClick} // Close menu on link click
        >
          Our Services
        </NavLink>
        <NavLink
          to="/work"
          className={({ isActive }) => (isActive ? "home-nav-link-active" : "home-nav-link")}
          onClick={handleLinkClick} // Close menu on link click
        >
          Our Work
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "home-nav-link-active" : "home-nav-link")}
          onClick={handleLinkClick} // Close menu on link click
        >
          Contact Us
        </NavLink>
      </div>

      {/* Login Icon */}
      <div className="login-icon">
        <Link to="/login">
          <FaUserCircle />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
