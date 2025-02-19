import React, { useState, useEffect } from "react";
import ImagePlaceholder from "../../assets/images/project-images/projectplaceholder.jpg"

const Project1 = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
          background: "#F3A83C",
          color: "#841B13",
          padding: "4rem 2rem",
          marginBottom: isMobile ?  "0.4rem" : "2rem",
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "2rem" : "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            fontFamily: "'Kode Mono', monospace",
            textTransform: "uppercase",
            color: "#841B13",
          }}
        >
          Project Title 2
        </h1>
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.2rem",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: isMobile ? "1.8" : "1",
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
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: isMobile ?  "0.4rem" : "2rem",
        }}
      >
        <img
          src={ImagePlaceholder}
          alt="Project 1"
          style={{
            width: "100%",
            height: isMobile ? "auto" : "300px",
            maxWidth: isMobile ? "100%" : "30%",
            objectFit: "cover",
            margin: "10px",
          }}
        />
        <img
          src={ImagePlaceholder}
          alt="Project 1"
          style={{
            width: "100%",
            height: isMobile ? "auto" : "300px",
            maxWidth: isMobile ? "100%" : "30%",
            objectFit: "cover",
            margin: "10px",

          }}
        />
        <img
          src={ImagePlaceholder}
          alt="Project 1"
          style={{
            width: "100%",
            height: isMobile ? "auto" : "300px",
            maxWidth: isMobile ? "100%" : "30%",
            objectFit: "cover",
            margin: "10px",
          }}
        />
      </section>

      {/* Details Section */}
      <section
        style={{
          background:"#841B13",
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
            fontSize: isMobile ? "0.8rem" : "1.1rem",
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
            fontSize: isMobile ? "0.8rem" : "1.1rem",
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
            width: isMobile ? "70%" : "100%",
            boxShadow:"none",
          }}
          >
            Goal: Describe the main objective of the project.</li>
          <li
          style={{
            color: "white",
            background: "transparent",
            width: isMobile ? "70%" : "100%",
            boxShadow:"none",
          }}>
            Technologies: List tools, frameworks, or languages used.</li>
          <li
          style={{
            color: "white",
            background: "transparent",
            width: isMobile ? "70%" : "100%",
            boxShadow:"none",
          }}
          >Outcome: Highlight measurable success metrics or results.</li>
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <section
        style={{
          margin: isMobile ? "3rem" : "6rem",
          textAlign: "center",
        }}
      >
        <a
          href="/work"
          style={{
            textDecoration: "none",
            padding: "1rem 2rem",
            background: "#F3A83C",
            color: "#fff",
            fontSize: isMobile ? "1rem" : "1.2rem",
            fontWeight: "bold",
            transition: "background 0.3s ease, transform 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.background = "#8BC4D9";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.background = "#F3A83C"; 
          }}
        >
          Back to Our Work
        </a>
      </section>
    </div>
  );
};

export default Project1;