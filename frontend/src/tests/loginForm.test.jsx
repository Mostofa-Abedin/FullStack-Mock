import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../components/loginForm/loginForm"; // Adjust the import as needed

describe("LoginForm", () => {
  test("displays error message if there's an exception in onSubmit", async () => {
    // Create a mock for the onSubmit prop that throws an error
    const mockOnSubmit = async () => {
      throw new Error("Network Error");
    };

    render(
      <MemoryRouter>
        <LoginForm onSubmit={mockOnSubmit} isAdmin={false} setIsAdmin={() => {}} />
      </MemoryRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password" } });

    // Submit the form (use getByRole to target the submit button)
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the error message to appear
    await waitFor(() => screen.getByText(/there was an error submitting the form./i));

    // Assert that the error message is displayed
    expect(screen.getByText(/there was an error submitting the form./i)).toBeInTheDocument();
  });
});
