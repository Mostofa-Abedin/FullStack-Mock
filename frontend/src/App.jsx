import UserList from "./components/UserList";
import Navbar from "./components/navBar/NavBar";
import Footer from "./components/Footer/Footer";
import ServicesSection from "./components/servicesSection/servicesSection";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css"

import HeroSection from "./components/heroSection/heroSection";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <HeroSection />
        <p className="hero-text">
          We craft solutions that 
          <span className="highlight red"> Attract</span>,
          <span className="highlight blue"> Engage</span>, &{" "}
          <span className="highlight yellow">Convert</span>.
        </p>
        <ServicesSection />
        <UserList />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
