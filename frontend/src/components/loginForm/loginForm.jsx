import React, { useState } from "react";
import "./loginform.css";
import LoginImage from "../../assets/images/project-images/projectplaceholder.jpg";

const LoginForm = ({ onSubmit, isAdmin, setIsAdmin }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the onSubmit prop with the form data
  };

  // Dynamic class names based on userType (admin or client)
  const formContainerClass = isAdmin ? "admin-form-container" : "client-form-container";
  const submitButtonClass = isAdmin ? "admin-submit-button" : "client-submit-button";

  // Set the form heading based on userType and login state
  const formHeading = isAdmin ? "ADMIN LOGIN" : isLogin ? "CLIENT LOGIN" : "CLIENT REGISTER";

  return (
    <div className={`form-container ${formContainerClass} ${!isAdmin ? "with-image" : ""}`}>
      <div className="form-content">
        <h2 className="form-title">{formHeading}</h2>

        {/* User Type Toggle */}
        <div className="user-type-toggle">
          <label>
            <input
              type="radio"
              name="userType"
              value="client"
              checked={!isAdmin}
              onChange={() => setIsAdmin(false)} // Switch to client page
            />
            Client
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="admin"
              checked={isAdmin}
              onChange={() => setIsAdmin(true)} // Switch to admin page
            />
            Admin
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field only for registration */}
          {!isLogin && !isAdmin && (
            <div className="form-field">
              <label htmlFor="name" className="label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                className="input-field"
              />
            </div>
          )}
          
          {/* Email field */}
          <div className="form-field">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {/* Password field */}
          <div className="form-field">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <button type="submit" className={submitButtonClass}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle button only for clients */}
        {!isAdmin && (
          <button
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Need an account? Register" : "Already have an account? Login"}
          </button>
        )}
      </div>

      {/* Show image for clients only */}
      {!isAdmin && (
        <div className="form-image">
          <img src={LoginImage} alt="Login" />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
