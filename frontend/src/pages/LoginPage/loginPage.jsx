import React, { useState } from "react";
import LoginForm from "../../components/loginForm/loginForm";
import Logo from "../../assets/images/magnetlabslogo_full.png"; 
import "./loginpage.css";  

const LoginPage = () => {
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
      {/* Login Form */}
      <div className="form-container">
        <div className="form-overlay">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <LoginForm
          onSubmit={handleLoginSubmit}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
      </div>
    </div>
  );
};

export default LoginPage;
