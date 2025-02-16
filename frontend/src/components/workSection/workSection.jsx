import React from "react";
import { Link } from "react-router-dom";
import "./workSection.css";

const WorkSection = () => {
  const projects = [
    { className: "project1", title: "Project 1", path: "/Project1" },
    { className: "project2", title: "Project 2", path: "/Project2" },
    { className: "project3", title: "Project 3", path: "/Project3" },
    { className: "project4", title: "Project 4", path: "/Project4" },
    { className: "project5", title: "Project 5", path: "/Project5" },
    { className: "project6", title: "Project 6", path: "/Project6" },
  ];

  return (
    <div className="work-section-container">
      <Link to="/work" className="work-section-link">
        <h2 className="work-section-title">Our Work</h2>
      </Link>

      <p className="work-section-description">
        Take a look at some of our most exciting projects and case studies.
      </p>
      
      <div className="work-section-cards">
        {projects.map((project, index) => (
          <div key={index} className={`work-section-card ${project.className}`}>
            <h3 className="work-section-card-title">{project.title}</h3>
            <Link to={project.path} className="work-section-card-link">
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkSection;
