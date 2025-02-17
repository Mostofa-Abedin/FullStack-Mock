import { render, screen } from "@testing-library/react";
import Services from "../pages/Services/Services";
import { BrowserRouter as Router } from "react-router-dom";

describe("Services Component", () => {
  // Wrap the component with Router to handle Link components
  const renderWithRouter = () => {
    render(
      <Router>
        <Services />
      </Router>
    );
  };

  test("renders the services introduction section", () => {
    renderWithRouter();

    expect(screen.getByText("Our Expertise,")).toBeInTheDocument();
    expect(screen.getByText("Your Advantage")).toBeInTheDocument();
    expect(
      screen.getByText(
        "From cutting-edge web development to impactful marketing strategies, we deliver solutions that help your business stand out."
      )
    ).toBeInTheDocument();
  });

  test("renders the services packages section", () => {
    renderWithRouter();

    const packageTitles = [
      "Starter Package",
      "Growth Package",
      "Custom Package",
    ];

    packageTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    expect(screen.getByText("Choose from flexible packages combining our core services to suit your needs.")).toBeInTheDocument();
  });

  test("renders the ContactSection component", () => {
    renderWithRouter();

    // Check if the ContactSection component is rendered
    expect(screen.getByText("Contact Us")).toBeInTheDocument();  // Adjust based on the ContactSection component's content
  });
});
