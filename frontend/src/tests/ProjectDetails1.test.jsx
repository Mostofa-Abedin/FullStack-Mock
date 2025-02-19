import React from "react";
import { render, screen } from "@testing-library/react";
import Project1 from "../pages/ProjectPages/projectdetails1";

describe("Project1 Component", () => {
  test("renders project title", () => {
    render(<Project1 />);
    expect(screen.getByText(/Project Title 1/i)).toBeInTheDocument();
  });

  test("renders project description", () => {
    render(<Project1 />);
    expect(
      screen.getByText(/A brief overview of the project, highlighting its goals, objectives, and outcomes./i)
    ).toBeInTheDocument();
  });

  test("renders three images", () => {
    render(<Project1 />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
    images.forEach((img) => {
      expect(img).toHaveAttribute("src", "/src/assets/images/project-images/projectplaceholder.jpg");
      expect(img).toHaveAttribute("alt", "Project 1");
    });
  });

  test("renders project details section", () => {
    render(<Project1 />);
    expect(screen.getByText(/Project Details/i)).toBeInTheDocument();
  });

  test("renders project details list", () => {
    render(<Project1 />);
    expect(
      screen.getByText(/Goal: Describe the main objective of the project./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Technologies: List tools, frameworks, or languages used./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Outcome: Highlight measurable success metrics or results./i)
    ).toBeInTheDocument();
  });

  test("renders call-to-action button", () => {
    render(<Project1 />);
    const link = screen.getByRole("link", { name: /Back to Our Work/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/work");
  });
});
