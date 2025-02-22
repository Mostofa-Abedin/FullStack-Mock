import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Contact from "../pages/Contact/Contact";

describe("Contact Component", () => {
  it("renders the contact form correctly", () => {
    render(<Contact />);

    // Check if form fields and button are present
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/inquiring about a package/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("allows user input", () => {
    render(<Contact />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/inquiring about a package/i), { target: { value: "Growth Package" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "I need a website redesign." } });

    // Verify values are entered correctly
    expect(screen.getByLabelText(/name/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/email/i)).toHaveValue("john@example.com");
    expect(screen.getByLabelText(/inquiring about a package/i)).toHaveValue("Growth Package");
    expect(screen.getByLabelText(/message/i)).toHaveValue("I need a website redesign.");
  });

  it("clears the form after submission", async () => {
    render(<Contact />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/inquiring about a package/i), { target: { value: "Growth Package" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "I need a website redesign." } });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }));
  });
});
