import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";
import ProjectPreview from "../../assets/images/project-images/projectplaceholder.jpg";

const ContactForm = () => {
  const form = useRef();
  const [packageValue, setPackageValue] = useState("starter"); // Default package

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_xi7xapf",  // EmailJS Service ID
        "template_qjj6vfb", // EmailJS Template ID
        form.current,
        "kuA5W1NtYBFzAytpx"   // EmailJS Public Key
      )
      .then(
        (result) => {
          console.log("Success:", result.text);
          alert("Message sent successfully!");
          form.current.reset(); // Clear the form after submission
          setPackageValue("starter"); // Reset dropdown
        },
        (error) => {
          console.log("Error:", error.text);
          alert("Failed to send message. Try again.");
        }
      );
  };

  return (
    <div className="message-form">
      <h2>Message Us</h2>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" placeholder="Your Name" required />

        <label>Email</label>
        <input type="email" name="user_email" placeholder="Your Email" required />

        <label>Inquiring about a package?</label>
        <select
          name="user_package"
          value={packageValue}
          onChange={(e) => setPackageValue(e.target.value)}
          required
        >
          <option value="Starter Package">Starter Package</option>
          <option value="Growth Package">Growth Package</option>
          <option value="Custom Package">Custom Package</option>
        </select>

        <label>Message</label>
        <textarea name="user_message" placeholder="Your Message" rows="5" required></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
