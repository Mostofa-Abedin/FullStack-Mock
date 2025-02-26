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

  // Retrieve the client's name from localStorage on page load
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setClientName(storedName); // Set the name to state if found in localStorage
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

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
        {clientName ? `Welcome, ${clientName}! Let's get you onboarded.` : "Welcome! Let's get you onboarded."}
      </h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <label>Business Name</label>
        <input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          required
        />

        <label>Industry</label>
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
        />

        <label>Website</label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <textarea
          name="address"
          resize="none"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OnboardingForm;
