import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ChangePassword from "../components/changePassword/ChangePassword";
import { BrowserRouter } from "react-router-dom";

describe("ChangePassword Component", () => {
  it("renders the Change Password form", () => {
    render(
      <BrowserRouter>
        <ChangePassword role="client" />
      </BrowserRouter>
    );

    // Check if the form elements are present by their labels
    expect(screen.getByLabelText(/Current Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText("New Password", { selector: "input" })).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm New Password", { selector: "input" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Change Password/i })).toBeInTheDocument();
  });

  it("displays an error message if the API request fails", async () => {
    render(
      <BrowserRouter>
        <ChangePassword role="client" />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Current Password/i), {
      target: { value: "currentpassword123" },
    });
    fireEvent.change(screen.getByLabelText("New Password", { selector: "input" }), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm New Password", { selector: "input" }), {
      target: { value: "newpassword123" },
    });

    // Mock a failed fetch request
    global.fetch = () =>
      Promise.resolve({
        ok: false,
      });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Change Password/i }));

    // Wait for the error message to appear
    expect(await screen.findByText(/Failed to change password/i)).toBeInTheDocument();
  });

  it("submits the form successfully when passwords match", async () => {
    render(
      <BrowserRouter>
        <ChangePassword role="client" />
      </BrowserRouter>
    );

    // Fill out the form with matching passwords
    fireEvent.change(screen.getByLabelText(/Current Password/i), {
      target: { value: "currentpassword123" },
    });
    fireEvent.change(screen.getByLabelText("New Password", { selector: "input" }), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm New Password", { selector: "input" }), {
      target: { value: "newpassword123" },
    });

    // Mock a successful API response
    global.fetch = () =>
      Promise.resolve({
        ok: true,
      });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Change Password/i }));

    // Wait for navigation (mocking successful submission)
    await waitFor(() => {
      expect(window.location.pathname).toBe("/client/dashboard");
    });
  });
});
