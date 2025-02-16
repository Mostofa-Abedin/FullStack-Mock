import React from "react";
import { Link } from "react-router-dom";
import "./servicesSection.css";

const servicesSection = () => {
  return (
    <div id="services" className="services-section">
      <Link to="/services" className="services-link">
        <h2 className="services-title">Our Services</h2>
      </Link>

      <p className="services-description">
        We provide cutting-edge digital solutions to help your business grow.
      </p>

      <div className="services-cards">
        {/* Example Service Cards */}
        {[
          { title: "Web\nDevelopment", className: "card-web" },
          { title: "SEO\nOptimisation", className: "card-seo" },
          { title: "Social Media Marketing", className: "card-mark" },
        ].map((service, index) => (
          <div
            key={index}
            className={`service-card ${service.className}`}
            role="article"
          >
            <div>
              {service.title.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default servicesSection;
