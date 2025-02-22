import React, { useState } from "react";
import "./loginform.css";

const LoginForm = ({ onSubmit, isAdmin, setIsAdmin }) => {
  const [isLogin, setIsLogin] = useState(true);
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
    onSubmit(formData);
  };

  const formContainerClass = isAdmin ? "admin-form-container" : "client-form-container";
  const submitButtonClass = isAdmin ? "admin-submit-button" : "client-submit-button";
  const formHeading = isAdmin ? "ADMIN LOGIN" : isLogin ? "CLIENT LOGIN" : "NEW CLIENT ACCOUNT";

  return (
    <div className={`form-container ${formContainerClass} ${!isAdmin ? "with-image" : ""}`}>
      <div className="form-content">
        <h2 className="form-title">{formHeading}</h2>

        <div className="user-type-toggle">
          <label>
            <input
              type="radio"
              name="userType"
              value="client"
              checked={!isAdmin}
              onChange={() => setIsAdmin(false)}
            />
            Client
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="admin"
              checked={isAdmin}
              onChange={() => setIsAdmin(true)}
            />
            Admin
          </label>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Name field only for registration */}
          {!isLogin && !isAdmin && (
            <div className="form-field form-input">
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

          <div className="form-field form-input">
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

          <div className="form-field form-input">
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

        {!isAdmin && (
          <button
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Need an account? Register" : "Already have an account? Login"}
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
