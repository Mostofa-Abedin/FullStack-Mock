import React, { useState } from "react";
import { Link } from "react-router-dom";
import magnetLogo from "../../assets/magnet_bg_removed.png";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      {/* Logo and Name */}
      <Link to="/" className="logo">
        <img src={magnetLogo} alt="Magnet Logo" className="logo-img" />
        <span className="logo-text">Magnet Labs™</span>
      </Link>

      {/* Hamburger Menu Button */}
      <button className="mobile-menu" data-testid="mobile-menu" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links (only visible when isOpen is true) */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}data-testid="nav-links">
        <Link to="/services" className="nav-link">
          Our Services
        </Link>
        <Link to="/work" className="nav-link">
          Our Work
        </Link>
        <Link to="/contact" className="nav-link">
          Contact Us
        </Link>
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
