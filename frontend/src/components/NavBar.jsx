import React from "react";
import { Link } from "react-router-dom";
import magnetLogo from "../assets/magnet_bg_removed.png";

const Navbar = () => {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        background: "#192F3C",
        padding: "0.8rem 2rem", // Sleeker padding
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100,
        color: "#fff",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        boxSizing: "border-box",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 32, 46, 0.8)",
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
            width: "70px", // Slightly larger logo
            height: "70px",
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
            fontSize: "2rem", // Smaller text for Magnet Labs
            fontWeight: "700",
            textTransform: "uppercase",
            color: "#F3DCB2",
          }}
        >
          Magnet Labs™
        </span>
      </Link>

      {/* Navigation Links */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          marginLeft: "auto", // Pushes the links towards the right but not fully
          marginRight: "5rem", // Brings them closer to the center from the right edge
        }}
      >
        <Link
          to="/services"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "500",
            fontFamily: "'Inter', sans-serif",
            transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.color = "#F3A83C")}
          onMouseOut={(e) => (e.target.style.color = "white")}
        >
          Our Services
        </Link>
        <Link
          to="/work"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "500",
            fontFamily: "'Inter', sans-serif",
            transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.color = "#F3A83C")}
          onMouseOut={(e) => (e.target.style.color = "white")}
        >
          Our Work
        </Link>
        <Link
          to="/contact"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "500",
            fontFamily: "'Inter', sans-serif",
            transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.color = "#F3A83C")}
          onMouseOut={(e) => (e.target.style.color = "white")}
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;