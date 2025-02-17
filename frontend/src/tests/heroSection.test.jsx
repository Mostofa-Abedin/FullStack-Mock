import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HeroSection from "../components/heroSection/heroSection";
import "@testing-library/jest-dom"; // Ensure correct matchers are imported

describe("HeroSection Component", () => {
  test("renders the hero section correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );

    // Check if the heading is present
    const heading = screen.getByTestId("hero-title");
    expect(heading).toHaveTextContent(/THE ART OF DIGITAL ATTRACTION/i);

    // Check if the video is present
    const video = container.querySelector("video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("autoPlay");
    expect(video).toHaveAttribute("loop");
  });

  test("renders floating icons", () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );

    const floatingIcons = screen.getAllByRole("img");
    expect(floatingIcons.length).toBeGreaterThan(0);

    floatingIcons.forEach((icon) => {
      expect(icon).toBeVisible();
    });
  });

  test("ensures all essential elements are visible", () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );
  });
});
