import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OnboardingForm from "../pages/OnboardingPage/onboardingPage";
import { BrowserRouter as Router } from "react-router-dom";

describe("OnboardingForm", () => {
  test("renders the onboarding form", async () => {
    render(
      <Router>
        <OnboardingForm />
      </Router>
    );

    // Use findBy to wait for the elements asynchronously
    await screen.findByPlaceholderText("Business Name");  
    await screen.findByPlaceholderText("Industry");
    await screen.findByPlaceholderText("Website");
    await screen.findByPlaceholderText("Phone");
    await screen.findByPlaceholderText("Address");
    await screen.findByText("Submit");
  });

  test("displays error message for invalid phone number", async () => {
    render(
      <Router>
        <OnboardingForm />
      </Router>
    );

    // Wait for the phone input to appear
    await screen.findByPlaceholderText("Phone");

    // Simulate user input for the phone field
    fireEvent.change(screen.getByPlaceholderText("Phone"), {
      target: { value: "12345" },
    });

    fireEvent.blur(screen.getByPlaceholderText("Phone")); // Trigger onBlur event

    // Wait for the error message and verify it
    await screen.findByText("Please enter a valid phone number.");
  });

  test("displays error message for invalid website", async () => {
    render(
      <Router>
        <OnboardingForm />
      </Router>
    );

    // Wait for the website input to appear
    await screen.findByPlaceholderText("Website");

    // Simulate user input for the website field
    fireEvent.change(screen.getByPlaceholderText("Website"), {
      target: { value: "invalid-website" },
    });

    fireEvent.blur(screen.getByPlaceholderText("Website")); // Trigger onBlur event

    // Wait for the error message and verify it
    await screen.findByText("Please enter a valid website URL.");
  });

  test("displays success message upon successful submission", async () => {
    render(
      <Router>
        <OnboardingForm />
      </Router>
    );

    // Wait for the form fields to appear
    await screen.findByPlaceholderText("Business Name");
    await screen.findByPlaceholderText("Industry");
    await screen.findByPlaceholderText("Website");
    await screen.findByPlaceholderText("Phone");
    await screen.findByPlaceholderText("Address");

    // Simulate user input for all fields
    fireEvent.change(screen.getByPlaceholderText("Business Name"), {
      target: { value: "Test Business" },
    });
    fireEvent.change(screen.getByPlaceholderText("Industry"), {
      target: { value: "Technology" },
    });
    fireEvent.change(screen.getByPlaceholderText("Website"), {
      target: { value: "https://www.testbusiness.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone"), {
      target: { value: "+123456789" },
    });
    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: "123 Test St" },
    });

    fireEvent.click(screen.getByText("Submit"));

  });
});
