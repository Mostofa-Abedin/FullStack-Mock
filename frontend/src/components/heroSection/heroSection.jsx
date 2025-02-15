import React from "react";
import "./heroSection.css";
import bgVideo from "../../assets/videos/Bg_video.mp4";
import Person1 from "../../assets/images/P1_bg_removed.png";
import Person2 from "../../assets/images/P2_bg_removed.png";
import Person3 from "../../assets/images/P3_bg_removed.png";
import Person4 from "../../assets/images/P4_bg_removed.png";

const HeroSection = () => {
  return (
    <div className="hero-section">
      {/* Video Container */}
      <div className="hero-video-container">
        <video autoPlay muted loop playsInline>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
      </div>

      {/* Overlay Content */}
      <div className="hero-content">
        <h1>
          THE ART OF <br />
          <span className="hero-highlight">DIGITAL ATTRACTION</span>
        </h1>
      </div>

      {/* Floating People */}
      <img
        src={Person1}
        alt="Floating Person 1"
        className="floating-icon icon1"
      />
      <img
        src={Person2}
        alt="Floating Person 2"
        className="floating-icon icon2"
      />
      <img
        src={Person3}
        alt="Floating Person 3"
        className="floating-icon icon3"
      />
       <img
        src={Person4}
        alt="Floating Person 4"
        className="floating-icon icon4"
      />
    </div>
  );
};

export default HeroSection;
