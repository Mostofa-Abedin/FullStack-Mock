import React from "react";
import { useNavigate } from "react-router-dom";
import "./contactSection.css"; 

const contactSection = () => {
  const navigate = useNavigate(); 

  return (
        <div id="contact" className="contact-section-container">
          <div className="contact-section-left">
            <h2 className="contact-section-title">Get in Touch</h2>
            <p className="contact-section-description">
              Have a question? Ready to start a project?
            </p>
          </div>
          <div className="contact-section-right">
            <p className="contact-cta-text">Let's connect!</p>
            <button
              className="contact-section-button"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </button>
          </div>
        </div>
      );
};

export default contactSection;
