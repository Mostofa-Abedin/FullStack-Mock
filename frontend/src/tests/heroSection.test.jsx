import { render, screen } from "@testing-library/react";
import HeroSection from "../components/heroSection/heroSection";
import "@testing-library/dom";

describe("HeroSection Component", () => {
  test("renders the hero section correctly", () => {
    render(<HeroSection />);
  });
  // Check if the heading is present
  expect(screen.getByText(/THE ART OF/i)).toBeInTheDocument();
  expect(screen.getByText(/DIGITAL ATTRACTION/i)).toBeInTheDocument();

  // Check if the video is present
  const video = screen.getByRole("video", { hidden: true });
  expect(video).toBeInTheDocument();
  expect(video).toHaveAttribute("autoPlay");
  expect(video).toHaveAttribute("muted");
  expect(video).toHaveAttribute("loop");
});

test("renders floating icons", () => {
  render(<HeroSection />);

  const floatingIcons = screen.getAllByRole("img"); // Assuming floating icons are <img> tags
  expect(floatingIcons.length).toBeGreaterThan(0);

  floatingIcons.forEach((icon) => {
    expect(icon).toBeVisible();
  });
  test("ensures all essential elements are visible", () => {
    render(<HeroSection />);

    // Check if the overlay content is visible
    expect(screen.getByText(/We craft solutions that/i)).toBeVisible();
  });
});
