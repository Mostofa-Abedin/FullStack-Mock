import React, { useState } from "react";
import "./loginform.css";

const LoginForm = ({ onSubmit, isAdmin, setIsAdmin }) => {
  const [isLogin, setIsLogin] = useState(true); // Whether the user is in login or register mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Regular expression for validating email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Regular expression for strong password (minimum 8 characters, at least one number, one uppercase letter, and one special character)
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Email validation
    if (name === "email") {
      if (!value) {
        setEmailError(""); // Clear error if input is empty
      } else if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }

    // Password validation only for registration
    if (name === "password" && !isLogin && !isAdmin) {
      if (!value) {
        setPasswordError(""); // Clear error if input is empty
      } else if (!passwordRegex.test(value)) {
        setPasswordError(
          "Password must be at least 8 characters, include one uppercase letter, one number, and one special character."
        );
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any validation errors during registration
    if ((emailError || passwordError) && !isLogin && !isAdmin) {
      return; // Prevent submission if there's an error during registration
    }

    // Add `isRegister` flag to differentiate login from registration
    const requestData = { ...formData, isRegister: !isLogin };

    try {
      const response = await onSubmit(requestData); // Send request to backend with isRegister flag

      // If submission is successful, show a success message
      if (response.success) {
        setSuccessMessage("Form submitted successfully!");
        setErrorMessage(null); // Clear error message if any
      } else {
        setErrorMessage("Something went wrong. Please try again.");
        setSuccessMessage(null); // Clear success message if any
      }
    } catch (error) {
      setErrorMessage("There was an error submitting the form.");
      setSuccessMessage(null); // Clear success message if any
    }
  };

  const formContainerClass = isAdmin
    ? "admin-form-container"
    : "client-form-container";
  const submitButtonClass = isAdmin
    ? "admin-submit-button"
    : "client-submit-button";
  const formHeading = isAdmin
    ? "ADMIN LOGIN"
    : isLogin
    ? "CLIENT LOGIN"
    : "NEW CLIENT ACCOUNT";

  return (
    <div
      className={`form-container ${formContainerClass} ${
        !isAdmin ? "with-image" : ""
      }`}
    >
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
              <label htmlFor="name" className="label">
                Name
              </label>
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
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          <div className="form-field form-input">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />
            {/* Password validation error message only for registration */}
            {!isLogin && !isAdmin && passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
          </div>

          <button type="submit" className={submitButtonClass}>
            {isAdmin ? "Login" : isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Display Success or Error Messages */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {!isAdmin && (
          <button
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
