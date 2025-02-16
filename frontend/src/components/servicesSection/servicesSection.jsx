import React from "react";
import { Link } from "react-router-dom";
import "./servicesSection.css"

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
        { title: "Web Development", icon: "💻" },
        { title: "SEO", icon: "📈" },
        { title: "Social Media Marketing", icon: "📱" },
      ].map((service, index) => (
        <div key={index} className="service-card">
          <div className="service-icon">{service.icon}</div>
          {service.title}
        </div>
      ))}
    </div>
  </div>
);
};

export default servicesSection;
