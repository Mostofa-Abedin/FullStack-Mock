import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/footer/footer";
import WorkSection from "./components/workSection/workSection";
import ServicesSection from "./components/servicesSection/servicesSection";
import ContactSection from "./components/contactSection/contactSection";
import HeroSection from "./components/heroSection/heroSection";

import Services from "./pages/Services/Services";
import Work from "./pages/Work/Work";
import Contact from "./pages/Contact/Contact";
import LoginPage from "./pages/LoginPage/loginPage";
import OnboardingPage from "./pages/OnboardingPage/onboardingPage";
import AdminDashboardPage from "./pages/AdminDashboard/adminDashboardPage";
import ClientListPage from "./pages/AdminDashboard/clientListPage";
import ProjectsListPage from "./pages/AdminDashboard/projectsListPage";
import AnnouncementsListPage from "./pages/AdminDashboard/announcementsListPage";
import ClientDashboardPage from "./pages/ClientDashboard/clientDashboardPage";
import ChangePassword from "./components/changePassword/ChangePassword"; // Import the ChangePassword component

import Project1 from "./pages/ProjectPages/projectdetails1";
import Project2 from "./pages/ProjectPages/projectdetails2";
import Project3 from "./pages/ProjectPages/projectdetails3";
import Project4 from "./pages/ProjectPages/projectdetails4";
import Project5 from "./pages/ProjectPages/projectdetails5";
import Project6 from "./pages/ProjectPages/projectdetails6";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Dashboard Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/clients" element={<ClientListPage />} />
        <Route path="/admin/projects" element={<ProjectsListPage />} />
        <Route path="/admin/announcements" element={<AnnouncementsListPage />} />
        {/* Admin Change Password Route */}
        <Route path="/admin/change-password" element={<ChangePassword role="admin" />} />

        {/* Client Dashboard Routes */}
        <Route path="/client/dashboard" element={<ClientDashboardPage />} />
        {/* Client Change Password Route */}
        <Route path="/client/change-password" element={<ChangePassword role="client" />} />

        {/* Login & Onboarding Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Public Routes with Navbar & Footer */}
        <Route path="/" element={
          <>
            <Navbar />
            <HeroSection />
            <p className="hero-text">
              We craft solutions that
              <span className="highlight red"> Attract</span>,
              <span className="highlight blue"> Engage</span>, &
              <span className="highlight yellow"> Convert</span>.
            </p>
            <ServicesSection />
            <WorkSection />
            <ContactSection />
            <Footer />
          </>
        } />
        <Route path="/services" element={<><Navbar /><Services /><Footer /></>} />
        <Route path="/work" element={<><Navbar /><Work /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />

        {/* Project Details Pages */}
        <Route path="/project1" element={<><Navbar /><Project1 /><Footer /></>} />
        <Route path="/project2" element={<><Navbar /><Project2 /><Footer /></>} />
        <Route path="/project3" element={<><Navbar /><Project3 /><Footer /></>} />
        <Route path="/project4" element={<><Navbar /><Project4 /><Footer /></>} />
        <Route path="/project5" element={<><Navbar /><Project5 /><Footer /></>} />
        <Route path="/project6" element={<><Navbar /><Project6 /><Footer /></>} />
      </Routes>
    </Router>
  );
}

export default App;
