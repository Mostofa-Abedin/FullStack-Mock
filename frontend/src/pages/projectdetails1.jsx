import React from "react";
import { transformWithEsbuild } from "vite";

const Project1 = () => {
  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* Header Section */}
      <section
        style={{
          background: "#8BC4D9",
          color: "#192F3C",
          padding: "4rem 2rem",
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            fontFamily: "'Kode Mono', monospace",
          }}
        >
          Project Title 1
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          A brief overview of the project, highlighting its goals, objectives,
          and outcomes.
        </p>
      </section>

      {/* Image Section */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <img
          src="https://via.placeholder.com/1200x600" // Replace with actual project image
          alt="Project 1"
          style={{
            width: "100%",
            maxWidth: "1000px",
            borderRadius: "12px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          }}
        />
      </section>

      {/* Details Section */}
      <section
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "#2c4875",
          }}
        >
          Project Details
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#555",
            lineHeight: "1.8",
            marginBottom: "1.5rem",
          }}
        >
          This section contains a detailed description of the project. Explain
          the purpose, tools/technologies used, challenges faced, and how they
          were addressed.
        </p>
        <ul
          style={{
            listStyleType: "disc",
            paddingLeft: "1.5rem",
            lineHeight: "1.8",
            color: "#555",
          }}
        >
          <li>Goal: Describe the main objective of the project.</li>
          <li>Technologies: List tools, frameworks, or languages used.</li>
          <li>Outcome: Highlight measurable success metrics or results.</li>
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <section
        style={{
          marginTop: "2rem",
          textAlign: "center",
        }}
      >
        <a
          href="/work"
          style={{
            textDecoration: "none",
            padding: "1rem 2rem",
            background: "linear-gradient(to right, #ff8531, #ffa600)",
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            transition: "background 0.3s ease, transform 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.background = "linear-gradient(to right, #ffa600, #ff8531)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.background = "linear-gradient(to right, #ff8531, #ffa600)";
          }}
        >
          Back to Our Work
        </a>
      </section>
    </div>
  );
};

export default Project1;