import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";
import ProjectPreview from "../../assets/images/project-images/projectplaceholder.jpg";

const Contact = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_package: "",
    user_message: "",
  });
  const [isSent, setIsSent] = useState(false);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    { question: "What services does Magnet Labs provide?", answer: "We offer web development, SEO, and more." },
    { question: "How can I get started with Magnet Labs?", answer: "Contact us via this form." },
    { question: "Can I customize my package?", answer: "Yes, we offer customizable packages." },
    { question: "What industries do you specialize in?", answer: "We specialize in various industries." },
    { question: "Do you offer ongoing support?", answer: "Yes, we offer ongoing support." },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the form data values
    const { user_name, user_email, user_package, user_message } = formData;

    // Send form data to EmailJS
    emailjs
      .sendForm(
        "service_xi7xapf", // EmailJS service ID
        "template_qjj6vfb", // EmailJS template ID
        e.target, // The form element to send
        "kuA5W1NtYBFzAytpx" // Your EmailJS user ID
      )
      .then(
        (result) => {
          setIsSent(true); // If the email was sent successfully, show the success message
          console.log(result.text); // Log the result for debugging
        },
        (error) => {
          console.log(error.text); // Log the error in case the email fails
        }
      );

    // Reset form after submission
    setFormData({
      user_name: "",
      user_email: "",
      user_package: "",
      user_message: "",
    });
  };

  // Debug logs for formData and openFAQ
  console.log("formData:", formData);
  console.log("openFAQ:", openFAQ);

  return (
    <div className="contact-container">
      <section className="intro-section">
        <h1>Let’s Build Something Great Together</h1>
        <p>Contact us for amazing web solutions!</p>
        <p style={{ color: "#F3A83C", marginTop: "50px" }}>
          0412 345 678 <br /> hello@magnetlabs.com.au
        </p>
      </section>

      <section className="message-form-section">
        <div className="message-form">
          <h2>Message Us</h2>
          {isSent && (
            <p
              id="success-message"
              style={{
                color: "#8BC4D9",
                fontSize: "1rem",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Thank you for your message! We'll get back to you soon.
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              value={formData.user_name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              value={formData.user_email}
              onChange={handleInputChange}
              required
            />
            <select
              name="user_package"
              value={formData.user_package}
              onChange={handleInputChange}
              required
            >
              <option value="Starter Package">Starter Package</option>
              <option value="Growth Package">Growth Package</option>
              <option value="Custom Package">Custom Package</option>
            </select>
            <textarea
              name="user_message"
              placeholder="Your Message"
              rows="5"
              value={formData.user_message}
              onChange={handleInputChange}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className="message-image">
          <img src={ProjectPreview} alt="Project" />
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openFAQ === index ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <h3>
                {faq.question}
                <span className={`faq-arrow ${openFAQ === index ? "open" : ""}`}>
                  {openFAQ === index ? "-" : "+"}
                </span>
              </h3>
              {openFAQ === index && <p>{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
