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
  const [touched, setTouched] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setClientName(storedName);
    }
  }, []);

  const websiteRegex = /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
  const phoneRegex = /^\+?[0-9]{6,15}$/;
  const addressRegex = /^\d+\s[A-z]+\s[A-z]+/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name]) validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "phone" && value && !phoneRegex.test(value)) {
      error = "Please enter a valid phone number.";
    } else if (name === "website" && value && !websiteRegex.test(value)) {
      error = "Please enter a valid website URL.";
    } else if (name === "address" && value && !addressRegex.test(value)) {
      error = "Please enter a valid address.";
    }
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (Object.values(formErrors).some((err) => err)) {
      setError("Please fix the errors before submitting.");
      return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("No authentication token found. Please log in.");
      return;
    }

    try {
      // Get the user ID from localStorage (assuming the ID is stored there)
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User ID not found. Please log in again.");
        return;
      }
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001"; 
      const response = await fetch(`${baseUrl}/users/${userId}/onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      console.log("Response Status:", response.status);
      console.log("Response Body:", text);

      if (!response.ok) {
        console.log()
        console.error("Request failed:", text);
        throw new Error(text || "Something went wrong with the request.");
      }

      let data = {};
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        throw new Error("Invalid response format from server.");
      }

      setSuccess(data.message || "Business onboarded successfully!");
      setTimeout(() => navigate("/client/dashboard"), 2000);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An unexpected error occurred.");
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
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <input
              type={field === "phone" ? "tel" : field === "website" ? "url" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="form-input"
              placeholder={
                field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()
              }              
            />
            {touched[field] && formErrors[field] && <div className="error-message">{formErrors[field]}</div>}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );  
};

export default OnboardingForm;
