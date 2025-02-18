import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Work from "../pages/Work/Work";

describe("Work Component", () => {
  test("renders the introductory section", () => {
    render(
      <MemoryRouter>
        <Work />
      </MemoryRouter>
    );
    expect(screen.getByText("Our Work Speaks for Itself")).toBeInTheDocument();
    expect(
      screen.getByText("Explore the projects that showcase our expertise and creativity.")
    ).toBeInTheDocument();
  });

  test("renders all project cards", () => {
    render(
      <MemoryRouter>
        <Work />
      </MemoryRouter>
    );
    const projectTitles = [
      "Project Title 1",
      "Project Title 2",
      "Project Title 3",
      "Project Title 4",
      "Project Title 5",
      "Project Title 6",
    ];
    projectTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("renders project links", () => {
    render(
      <MemoryRouter>
        <Work />
      </MemoryRouter>
    );
    const links = screen.getAllByText("Learn More");
    expect(links.length).toBe(6);
  });
});
