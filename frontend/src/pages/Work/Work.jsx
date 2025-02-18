import React from "react";
import { Link } from "react-router-dom";
import "./Work.css"; 
import ContactSection from "../../components/contactSection/contactSection";

// Import project preview images
import ProjectPreview from "../../assets/images/card-dev.png";

const Work = () => {
  const projects = [
    { title: "Project Title 1", description: "A brief description of this project.", link: "/Project1", image: ProjectPreview },
    { title: "Project Title 2", description: "Another project showcasing our expertise.", link: "/Project2", image: ProjectPreview },
    { title: "Project Title 3", description: "Discover the innovative solutions we deliver.", link: "/Project3", image: ProjectPreview },
    { title: "Project Title 4", description: "Explore how we turn ideas into success.", link: "/Project4", image: ProjectPreview },
    { title: "Project Title 5", description: "A remarkable project crafted with precision.", link: "/Project5", image: ProjectPreview },
    { title: "Project Title 6", description: "Elevating brands through creativity and strategy.", link: "/Project6", image: ProjectPreview },
  ];

  return (
    <div className="work-container">
      {/* Introductory Section */}
      <section className="work-intro">
        <h1>Our Work Speaks for Itself</h1>
        <p>Explore the projects that showcase our expertise and creativity.</p>
      </section>
  
      {/* Project Grid Section */}
      <section className="project-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <img src={project.image} alt={project.title} />
            <p>{project.description}</p>
            <Link to={project.link} className="project-link">Learn More</Link>
          </div>
        ))}
      </section>
  
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Work;