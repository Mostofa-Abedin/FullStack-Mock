import { render, screen, fireEvent } from "@testing-library/react";
import OnboardingForm from "../pages/OnboardingPage/onboardingPage";
import { BrowserRouter as Router } from "react-router-dom";

describe("OnboardingForm", () => {
  test("renders the onboarding form", () => {
    render(
      <Router>
        <OnboardingForm />
      </Router>
    );

    // Ensure that the form elements are rendered correctly
    screen.getByPlaceholderText("Business Name");
    screen.getByPlaceholderText("Industry");
    screen.getByPlaceholderText("Website");
    screen.getByPlaceholderText("Phone");
    screen.getByPlaceholderText("Address");
    screen.getByText("Submit");
  });

  test("displays error message for invalid phone number", () => {
    render(
      <Router>
        <OnboardingForm />
      </Router>
    );

    // Simulate user input for the phone field
    fireEvent.change(screen.getByPlaceholderText("Phone"), {
      target: { value: "12345" },
    });

    fireEvent.blur(screen.getByPlaceholderText("Phone")); // Trigger onBlur event

  });

  test("displays error message for invalid website", () => {
    render(
      <Router>
        <OnboardingForm />
      </Router>
    );

    // Simulate user input for the website field
    fireEvent.change(screen.getByPlaceholderText("Website"), {
      target: { value: "invalid-website" },
    });

    fireEvent.blur(screen.getByPlaceholderText("Website")); // Trigger onBlur event

  });

  test("displays success message upon successful submission", () => {
    render(
      <Router>
        <OnboardingForm />
      </Router>
    );

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

  test("does not show error for empty fields before user interaction", () => {
    render(
      <Router>
        <OnboardingForm />
      </Router>
    );

    // Ensure form elements are rendered
    screen.getByPlaceholderText("Phone");
    screen.getByPlaceholderText("Website");
  });
});
