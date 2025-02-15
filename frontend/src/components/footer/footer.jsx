import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import magnetLogo from "../../assets/magnet_bg_removed.png";
import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">

      {/* Logo and Name */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "inherit",
          gap: "0.5rem",
        }}
      >
        <img className="magnet-logo"
          src={magnetLogo}
          alt="Magnet Logo"
        />
        <span className="logo-text-footer"
        >
          Magnet Labs™
        </span>
      </Link>
      <p className="copyright"
      >
        © 2025 Magnet Labs. All rights reserved.
      </p>
      <div className="social-icons"
      >
        {/* Facebook */}
        <a
          href="https://www.facebook.com/MagnetLabs" 
          aria-label="Facebook"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#1877f2", // Official Facebook blue
            transition: "transform 0.4s ease-in-out, opacity 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.opacity = "0.85";
            e.target.style.transform = "scale(1.05)";
            e.target.style.color = "#F3A83C";
          }}
          onMouseOut={(e) => {
            e.target.style.opacity = "1";
            e.target.style.transform = "scale(1)";
            e.target.style.color = "#1877f2";
          }}
        >
          <FaFacebook size={25} />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/MagnetLabs" 
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#e1306c", // Official Instagram pink
            transition: "transform 0.4s ease-in-out, opacity 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.opacity = "0.85";
            e.target.style.transform = "scale(1.05)";
            e.target.style.color = "#F3A83C";
          }}
          onMouseOut={(e) => {
            e.target.style.opacity = "1";
            e.target.style.transform = "scale(1)";
            e.target.style.color = "#e1306c";
          }}
        >
          <FaInstagram size={25} />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/MagnetLabs" 
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "white", 
            transition: "transform 0.4s ease-in-out, opacity 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.opacity = "0.85";
            e.target.style.transform = "scale(1.05)";
            e.target.style.color = "#F3A83C";
          }}
          onMouseOut={(e) => {
            e.target.style.opacity = "1";
            e.target.style.transform = "scale(1)";
            e.target.style.color = "white";
          }}
        >
          <FaLinkedin  size={25}/>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
