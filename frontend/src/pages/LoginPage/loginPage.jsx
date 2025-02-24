import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import LoginForm from "../../components/loginForm/loginForm";
import Logo from "../../assets/images/magnetlabslogo_full.png"; 
import LoginImage from "../../assets/images/loginbackground.png"; // Import the image
import "./loginpage.css";  

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the page loads
  }, []);
  const [isAdmin, setIsAdmin] = useState(false); // Default is client login

  const handleLoginSubmit = async (formData) => {
    const endpoint = formData.name ? "/api/register" : "/api/login"; 
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className={`login-page ${isAdmin ? "admin-login-page" : "client-login-page"}`}>
      {/* Show image for clients only */}
      {!isAdmin && (
        <div className="form-image">
          <img src={LoginImage} alt="Login" />
        </div>
      )}

      {/* Login Form */}
      <div className="form-container">
        {/* Logo above the form */}
        <div className="form-overlay">
          <Link to="/"> {/* Wrap the logo in a Link to home page */}
            <img src={Logo} alt="Logo" className="login-logo" />
          </Link>
        </div>

        {/* Form container for proper spacing */}
        <div className="login-form-container">
          <LoginForm
            onSubmit={handleLoginSubmit}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
