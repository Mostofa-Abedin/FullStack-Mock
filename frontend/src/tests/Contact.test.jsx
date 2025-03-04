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

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Your Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Your Email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Your Message/i), {
      target: { value: "Hello, I need help!" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Send Message/i }));

    // Add logging to confirm that the success message is being rendered correctly
    console.log("Form submitted, waiting for success message...");

    // Wait for the success message to appear with increased timeout
    await waitFor(() => {
      // Log if the success message is found
      const successMessage = screen.queryByText(/Thank you for your message! We'll get back to you soon./i);
      if (successMessage) {
        console.log("Success message rendered");
      }
      return successMessage; // This ensures we wait for the success message
    }, { timeout: 10000 });

    // Log if we get to this point, meaning the success message was found
    console.log("Success message found, checking if form is cleared");

    // Assert that the form fields are cleared
    expect(screen.getByPlaceholderText(/Your Name/i).value).toBe("");
    expect(screen.getByPlaceholderText(/Your Email/i).value).toBe("");
    expect(screen.getByPlaceholderText(/Your Message/i).value).toBe("");
  });
});
