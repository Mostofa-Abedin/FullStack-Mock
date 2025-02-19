import React from "react";
import ImagePlaceholder from "../assets/images/project-images/projectplaceholder.jpg"

const Project1 = () => {
  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
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
            textTransform: "uppercase",
            color: "#192F3C",
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
          src={ImagePlaceholder}
          alt="Project 1"
          style={{
            width: "100%",
            height: "600px",
            maxWidth: "30%",
            objectFit: "cover",
            margin: "10px",
          }}
        />
        <img
          src={ImagePlaceholder}
          alt="Project 1"
          style={{
            width: "100%",
            height: "600px",
            maxWidth: "30%",
            objectFit: "cover",
            margin: "10px",

          }}
        />
        <img
          src={ImagePlaceholder}
          alt="Project 1"
          style={{
            width: "100%",
            height: "600px",
            maxWidth: "30%",
            objectFit: "cover",
            margin: "10px",
          }}
        />
      </section>

      {/* Details Section */}
      <section
        style={{
          background:"#192F3C",
          padding: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "white",
            fontFamily: "'Kode Mono', monospace",
            textTransform: "uppercase",
          }}
        >
          Project Details
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "white",
            lineHeight: "1.8",
            marginBottom: "1.5rem",
            fontFamily: "'Inter', sans-serif",
            fontWeight: "400",
          }}
        >
          This section contains a detailed description of the project. Explain
          the purpose, tools/technologies used, challenges faced, and how they
          were addressed.
        </p>
        <ul
          style={{
            lineHeight: "1.8",
            fontFamily: "'Inter', sans-serif",
            fontWeight: "400",
            textAlign: "center",
            display:"flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <li
          style={{
            color: "white",
            background: "transparent",
            width: "100%",
            boxShadow:"none",
          }}
          >
            Goal: Describe the main objective of the project.</li>
          <li
          style={{
            color: "white",
            background: "transparent",
            width: "100%",
            boxShadow:"none",
          }}>
            Technologies: List tools, frameworks, or languages used.</li>
          <li
          style={{
            color: "white",
            background: "transparent",
            width: "100%",
            boxShadow:"none",
          }}
          >Outcome: Highlight measurable success metrics or results.</li>
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <section
        style={{
          margin: "6rem",
          textAlign: "center",
        }}
      >
        <a
          href="/work"
          style={{
            textDecoration: "none",
            padding: "1rem 2rem",
            background: "#8BC4D9",
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: "bold",
            transition: "background 0.3s ease, transform 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.background = "#F3A83C";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.background = "#8BC4D9";
          }}
        >
          Back to Our Work
        </a>
      </section>
    </div>
  );
};

export default Project1;