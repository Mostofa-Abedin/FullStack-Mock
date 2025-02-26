import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./onboardingpage.css";

const OnboardingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    website: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [clientName, setClientName] = useState("");

  // Touched state for fields to track if the user has interacted with them
  const [touched, setTouched] = useState({
    phone: false,
    website: false,
    address: false,
  });

  // Debounce timers for form fields
  const [timers, setTimers] = useState({
    phone: null,
    website: null,
    address: null,
  });

  // Retrieve the client's name from localStorage on page load
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setClientName(storedName); // Set the name to state if found in localStorage
    }
  }, []);

  const [formErrors, setFormErrors] = useState({
    phoneError: "",
    websiteError: "",
    addressError: "",
  });

  // Regular expression for validating website URL
  const websiteRegex = /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,6}(\/[\w\d-]*)*\/?$/;

  // Regular expression for validating phone number (E.164 format)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  const addressRegex = /\d+\s[A-z]+\s[A-z]+/; // Simple address validation regex

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // If the field is touched, we can start the validation
    if (touched[name]) {
      clearTimeout(timers[name]); // Clear the previous timer
      const newTimer = setTimeout(() => validateField(name, value), 500); // Start a new timer for debounce
      setTimers((prev) => ({ ...prev, [name]: newTimer }));
    }
  };

  const handleBlur = (e) => {
    // Mark the field as touched when it loses focus
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));

    // After blur, validate immediately
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name, value) => {
    if (name === "phone") {
      if (!value) {
        setFormErrors((prev) => ({
          ...prev,
          phoneError: "",
        }));
      } else if (!phoneRegex.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          phoneError: "Please enter a valid phone number.",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          phoneError: "",
        }));
      }
    }

    if (name === "website") {
      if (!value) {
        setFormErrors((prev) => ({
          ...prev,
          websiteError: "",
        }));
      } else if (!websiteRegex.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          websiteError: "Please enter a valid website URL.",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          websiteError: "",
        }));
      }
    }

    if (name === "address") {
      if (!value) {
        setFormErrors((prev) => ({
          ...prev,
          addressError: "Address is required.",
        }));
      } else if (!addressRegex.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          addressError: "Please enter a valid address.",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          addressError: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Check for form validation errors before submitting
    if (formErrors.phoneError || formErrors.websiteError || formErrors.addressError) {
      setError("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/register-business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Business onboarded successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="onboarding-container">
      <h2 className="form-title">
        {clientName
          ? `Welcome, ${clientName}! Let's get you onboarded.`
          : "Welcome! Let's get you onboarded."}
      </h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="Business Name"
        />

        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="Industry"
        />

        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          onBlur={handleBlur} // Mark as touched when the field loses focus
          required
          className="form-input"
          placeholder="Website"
        />
        {touched.website && formErrors.websiteError && (
          <div className="error-message">{formErrors.websiteError}</div>
        )}

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur} // Mark as touched when the field loses focus
          required
          className="form-input"
          placeholder="Phone"
        />
        {touched.phone && formErrors.phoneError && (
          <div className="error-message">{formErrors.phoneError}</div>
        )}

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleBlur} // Mark as touched when the field loses focus
          required
          className="form-input"
          placeholder="Address"
        />
        {touched.address && formErrors.addressError && (
          <div className="error-message">{formErrors.addressError}</div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OnboardingForm;
