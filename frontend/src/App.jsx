import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/footer/footer";
import WorkSection from "./components/workSection/workSection";
import ServicesSection from "./components/servicesSection/servicesSection";
import ContactSection from "./components/contactSection/contactSection";
import HeroSection from "./components/heroSection/heroSection";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Services from "./pages/Services/Services";
import Work from "./pages/Work/Work";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
    
          <Route path="/" element={
            <>
              <HeroSection />
              <p className="hero-text">
                We craft solutions that 
                <span className="highlight red"> Attract</span>,
                <span className="highlight blue"> Engage</span>, &{" "}
                <span className="highlight yellow">Convert</span>.
              </p>
              <ServicesSection />
              <WorkSection />
              <ContactSection />
            </>
          } />

      
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />


     
        </Routes>


        <Footer />
      </div>
    </Router>
  );
}

export default App;
