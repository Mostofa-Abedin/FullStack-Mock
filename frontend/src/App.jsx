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
import Contact from "./pages/Contact/Contact";

import Project1 from "./pages/ProjectPages/projectdetails1";
import Project2 from "./pages/ProjectPages/projectdetails2";
import Project3 from "./pages/ProjectPages/projectdetails3";
import Project4 from "./pages/ProjectPages/projectdetails4";
import Project5 from "./pages/ProjectPages/projectdetails5";
import Project6 from "./pages/ProjectPages/projectdetails6";

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
          <Route path="/contact" element={<Contact />} />


          <Route path="/project1" element={<Project1 />} />
          <Route path="/project2" element={<Project2 />} />
          <Route path="/project3" element={<Project3 />} />
          <Route path="/project4" element={<Project4 />} />
          <Route path="/project5" element={<Project5 />} />
          <Route path="/project6" element={<Project6 />} />
     
        </Routes>


        <Footer />
      </div>
    </Router>
  );
}

export default App;
