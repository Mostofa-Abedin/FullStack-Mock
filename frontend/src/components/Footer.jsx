import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import magnetLogo from "../assets/magnet_bg_removed.png";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#192F3C",
        color: "#fff",
        textAlign: "center",
        padding: "2rem 2rem",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
      }}
    >
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
        <img
          src={magnetLogo}
          alt="Magnet Logo"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "contain",
            transition: "transform 0.3s ease, filter 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.2)";
            e.target.style.filter = "drop-shadow(0 0 15px #ffa600)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.filter = "none";
          }}
        />
        <span
          style={{
            fontFamily: "'Kode Mono', monospace",
            fontSize: "1.5rem", // Smaller text for Magnet Labs
            fontWeight: "700",
            textTransform: "uppercase",
            color: "#F3DCB2",
          }}
        >
          Magnet Labs™
        </span>
      </Link>
      <p
        style={{
          marginBottom: "1rem",
          fontSize: "1rem",
          marginLeft: "auto",
          marginRight: "2rem",
        }}
      >
        © 2025 Magnet Labs. All rights reserved.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          marginTop: "8px",
        }}
      >
        {/* Facebook */}
        <a
          href="https://www.facebook.com/MagnetLabs" // Replace with your actual Facebook URL
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
          }}
          onMouseOut={(e) => {
            e.target.style.opacity = "1";
            e.target.style.transform = "scale(1)";
          }}
        >
          <FaFacebook size={30} />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/MagnetLabs" // Replace with your actual Instagram URL
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
          }}
          onMouseOut={(e) => {
            e.target.style.opacity = "1";
            e.target.style.transform = "scale(1)";
          }}
        >
          <FaInstagram size={30} />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/MagnetLabs" // Replace with your actual LinkedIn URL
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "white", // Official LinkedIn blue
            transition: "transform 0.4s ease-in-out, opacity 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.opacity = "0.85";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.opacity = "1";
            e.target.style.transform = "scale(1)";
          }}
        >
          <FaLinkedin size={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
