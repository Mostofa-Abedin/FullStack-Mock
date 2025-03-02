import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Contact from "../pages/Contact/Contact";

// Mocking FontAwesomeIcon replacement
const mockFontAwesomeIcon = ({ icon }) => <span>{icon === "chevron-up" ? "-" : "+"}</span>;

describe("Contact Component", () => {
  test("renders the contact form correctly", () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send Message/i })).toBeInTheDocument();
  });

  test("allows user input", () => {
    render(<Contact />);
    fireEvent.change(screen.getByPlaceholderText(/Your Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Your Email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Your Message/i), {
      target: { value: "Hello, I need help!" },
    });
    expect(screen.getByPlaceholderText(/Your Name/i).value).toBe("John Doe");
    expect(screen.getByPlaceholderText(/Your Email/i).value).toBe("john.doe@example.com");
    expect(screen.getByPlaceholderText(/Your Message/i).value).toBe("Hello, I need help!");
  });

  test("clears the form after submission", async () => {
    render(<Contact />);
    fireEvent.change(screen.getByPlaceholderText(/Your Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Your Email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Your Message/i), {
      target: { value: "Hello, I need help!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send Message/i }));

    // Add some logging to help debug if the success message renders
    console.log("Form submitted, waiting for success message...");

    // Wait for the success message to appear with increased timeout
    await waitFor(() =>
      screen.findByText(/Thank you for your message! We'll get back to you soon./i), 
      { timeout: 5000 }  // Increased timeout to 5 seconds
    );

    console.log("Success message found, checking if form is cleared");

    // Assert that the form fields are cleared
    expect(screen.getByPlaceholderText(/Your Name/i).value).toBe("");
    expect(screen.getByPlaceholderText(/Your Email/i).value).toBe("");
    expect(screen.getByPlaceholderText(/Your Message/i).value).toBe("");
  });

  test("toggles FAQ items correctly", () => {
    render(<Contact />);
    fireEvent.click(screen.getByText(/What services does Magnet Labs provide?/i));
    expect(screen.getByText(/We offer web development, SEO, and more./i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/What services does Magnet Labs provide?/i));
    expect(screen.queryByText(/We offer web development, SEO, and more./i)).toBeNull();
  });
});
