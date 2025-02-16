import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactSection from "../components/contactSection/contactSection"; // Ensure correct import path
import "@testing-library/jest-dom"; 

describe("ContactSection Component", () => {
  test("renders the heading and description correctly", () => {
    render(
      <MemoryRouter>
        <ContactSection />
      </MemoryRouter>
    );

    // Check if the heading is present
    const heading = screen.getByText(/Get in Touch/i); // Simple RegExp matcher
    expect(heading).toBeInTheDocument();

    // Check if the description is present
    const description = screen.getByText(/Have a question\? Ready to start a project\?/i);
    expect(description).toBeInTheDocument();
  });

  test("renders the button correctly", () => {
    render(
      <MemoryRouter>
        <ContactSection />
      </MemoryRouter>
    );

    // Check if the button is present
    const button = screen.getByRole("button", { name: /Contact Us/i });
    expect(button).toBeInTheDocument();
  });
});
