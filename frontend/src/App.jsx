import UserList from './components/UserList';
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <h1>FullStack Mock App</h1>
        <UserList />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
