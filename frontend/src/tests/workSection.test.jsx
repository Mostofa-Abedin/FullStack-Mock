import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import WorkSection from "../components/workSection/workSection";

describe("WorkSection Component", () => {
  // Helper function to render the component with Router
  const renderWithRouter = () => {
    render(
      <Router>
        <WorkSection />
      </Router>
    );
  };

  test("renders work section title", () => {
    renderWithRouter();
    const title = screen.getByText(/Our Work/i);
    expect(title).toBeInTheDocument();
  });

  test("renders work section description", () => {
    renderWithRouter();
    const description = screen.getByText(
      /Take a look at some of our most exciting projects and case studies./i
    );
    expect(description).toBeInTheDocument();
  });

  test("renders all project cards", () => {
    renderWithRouter();
    const projectTitles = [
      "Project 1",
      "Project 2",
      "Project 3",
      "Project 4",
      "Project 5",
      "Project 6",
    ];

    projectTitles.forEach((title) => {
      const projectCard = screen.getByText(title);
      expect(projectCard).toBeInTheDocument();
    });
  });

  test("has links that navigate to correct paths", () => {
    renderWithRouter();
    const links = screen.getAllByRole("link");
    
    expect(links[0]).toHaveAttribute("href", "/work"); // Work section link
    expect(links[1]).toHaveAttribute("href", "/Project1"); // Project 1 link
    expect(links[2]).toHaveAttribute("href", "/Project2"); // Project 2 link
    expect(links[3]).toHaveAttribute("href", "/Project3"); // Project 3 link
    expect(links[4]).toHaveAttribute("href", "/Project4"); // Project 4 link
    expect(links[5]).toHaveAttribute("href", "/Project5"); // Project 5 link
    expect(links[6]).toHaveAttribute("href", "/Project6"); // Project 6 link
  });

  test("button text in project cards says 'Learn More'", () => {
    renderWithRouter();
    const buttonTexts = screen.getAllByText(/Learn More/i);
    buttonTexts.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  test("clicking 'Learn More' links navigates to correct path", () => {
    renderWithRouter();
    const projectLinks = screen.getAllByRole("link", { name: /Learn More/i });

    fireEvent.click(projectLinks[0]);
    expect(window.location.pathname).toBe("/Project1");

    fireEvent.click(projectLinks[1]);
    expect(window.location.pathname).toBe("/Project2");

    fireEvent.click(projectLinks[2]);
    expect(window.location.pathname).toBe("/Project3");

    fireEvent.click(projectLinks[3]);
    expect(window.location.pathname).toBe("/Project4");

    fireEvent.click(projectLinks[4]);
    expect(window.location.pathname).toBe("/Project5");

    fireEvent.click(projectLinks[5]);
    expect(window.location.pathname).toBe("/Project6");
  });
});
