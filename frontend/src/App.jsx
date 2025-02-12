import UserList from './components/UserList';
import Navbar from "./components/NavBar";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <Router>
        <Navbar />
        <h1>FullStack Mock App</h1>
        <UserList />
    </Router>
  );
}

export default App;
