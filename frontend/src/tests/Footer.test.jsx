import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../components/Footer/Footer";

describe("Footer Component", () => {
  it("renders the footer with text and social links", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Check if the footer text is displayed
    expect(
      screen.getByText(/© 2025 Magnet Labs. All rights reserved./i)
    ).toBeInTheDocument();

    // Check if the social media icons are displayed
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
  });

  it("links point to the correct URLs", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Check if the links point to the correct social media pages
    const facebookLink = screen.getByLabelText("Facebook");
    const instagramLink = screen.getByLabelText("Instagram");
    const linkedinLink = screen.getByLabelText("LinkedIn");

    expect(facebookLink).toHaveAttribute(
      "href",
      "https://www.facebook.com/MagnetLabs"
    );
    expect(instagramLink).toHaveAttribute(
      "href",
      "https://www.instagram.com/MagnetLabs"
    );
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/MagnetLabs"
    );
  });
});
