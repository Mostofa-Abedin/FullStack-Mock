import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";
import { FaUserCircle } from "react-icons/fa";

describe("Navbar Component", () => {

  test("renders the company name 'Magnet Labs™'", () => {
    render(<Navbar />, { wrapper: MemoryRouter });

    expect(screen.getByText("Magnet Labs™")).toBeInTheDocument();
  });

  test("renders all navigation links", () => {
    render(<Navbar />, { wrapper: MemoryRouter });

    expect(screen.getByText("Our Services")).toBeInTheDocument();
    expect(screen.getByText("Our Work")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  test("navigation links contain correct href attributes", () => {
    render(<Navbar />, { wrapper: MemoryRouter });

    expect(screen.getByText("Our Services")).toHaveAttribute(
      "href",
      "/services"
    );
    expect(screen.getByText("Our Work")).toHaveAttribute("href", "/work");
    expect(screen.getByText("Contact Us")).toHaveAttribute("href", "/contact");
  });
  test("renders the login icon", () => {
    render(<FaUserCircle data-testid="login-icon" style={{ fontSize: "24px", marginLeft: "20px", color: "#F3DCB2" }} />);
    const loginIcon = screen.getByTestId("login-icon");
    expect(loginIcon).toBeInTheDocument();
  });

//   Responsiveness Testing

test("hamburger menu is visible on mobile", () => {
    render(<Navbar />, { wrapper: MemoryRouter });

    // Check if the hamburger menu exists
    const hamburger = screen.getByTestId("mobile-menu");
    expect(hamburger).toBeInTheDocument();
  });

  test("clicking hamburger menu opens and closes the navigation links", () => {
    render(<Navbar />, { wrapper: MemoryRouter });

    const hamburger = screen.getByTestId("mobile-menu");
    const navLinks = screen.getByTestId("nav-links");

    // Initially, the menu should be closed
    expect(navLinks).not.toHaveClass("open");

    // Click to open the menu
    fireEvent.click(hamburger);
    expect(navLinks).toHaveClass("open");

    // Click again to close the menu
    fireEvent.click(hamburger);
    expect(navLinks).not.toHaveClass("open");
  });
});