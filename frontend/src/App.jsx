import UserList from './components/UserList';
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import HeroSection from './components/heroSection/heroSection';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <HeroSection />
        <h1>FullStack Mock App</h1>
        <UserList />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
