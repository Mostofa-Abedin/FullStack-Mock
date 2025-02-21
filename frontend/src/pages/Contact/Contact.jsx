import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS
import "./contact.css";

import ProjectPreview from "../../assets/images/project-images/projectplaceholder.jpg";

const Contact = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What services does Magnet Labs provide?",
      answer:
        "Magnet Labs offers web development, SEO, social media marketing, and tailored packages to meet your business needs.",
    },
    {
      question: "How can I get started with Magnet Labs?",
      answer:
        "Simply use the contact form on this page or email us at info@magnetlabs.com. Our team will get back to you within 1-2 business days.",
    },
    {
      question: "Can I customize my package?",
      answer:
        "Absolutely! We provide flexible and customizable packages to suit your business requirements and goals.",
    },
    {
      question: "What industries do you specialize in?",
      answer:
        "We specialize in a variety of industries, including e-commerce, professional services, and startups, but are open to working with businesses from any sector.",
    },
    {
      question: "Do you offer ongoing support and maintenance?",
      answer:
        "Yes, we provide ongoing support and maintenance services to ensure your website and campaigns perform optimally.",
    },
  ];

  return (
    <div className="contact-container">
      <section className="intro-section">
        <h1>Let’s Build Something Great Together</h1>
        <p>
          Whether you're looking to create a stunning website, boost your online
          presence, or launch an engaging marketing campaign, we're here to make
          it happen.
        </p>
        <p id="contact-details">
          hello@magnetlabs.com.au <br />
          0412 345 678
        </p>
      </section>

      <section className="message-form-section">
        <div className="message-form">
          <h2>Message Us</h2>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="user_name" placeholder="Your Name" required />

            <label>Email</label>
            <input type="email" name="user_email" placeholder="Your Email" required />

            <label>Inquiring about a package?</label>
            <select name="user_package" required>
              <option value="starter">Starter Package</option>
              <option value="business">Growth Package</option>
              <option value="premium">Custom Package</option>
            </select>

            <label>Message</label>
            <textarea name="user_message" placeholder="Your Message" rows="5" required></textarea>

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
                <span className={`faq-arrow ${openFAQ === index ? "open" : ""}`}></span>
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
