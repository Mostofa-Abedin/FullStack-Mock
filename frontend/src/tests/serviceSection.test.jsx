import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ServicesSection from "../components/servicesSection/servicesSection";

describe("ServicesSection Component", () => {
  test("renders service cards correctly", () => {
    render(
      <Router>
        <ServicesSection />
      </Router>
    );

    const serviceCards = screen.getAllByRole("article");

    expect(serviceCards[0]).toHaveTextContent("WebDevelopment");
    expect(serviceCards[1]).toHaveTextContent("SEOOptimisation");
    expect(serviceCards[2]).toHaveTextContent("Social MediaMarketing");
  });
});
