import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import LoginForm from "../components/loginForm/loginForm"; // Adjust import as necessary
import userEvent from "@testing-library/user-event";

describe("LoginForm", () => {
  let mockOnSubmit, mockSetIsAdmin;

  test("renders form for login by default", () => {
    render(
      <Router>  {/* Wrap the LoginForm component in Router */}
        <LoginForm onSubmit={mockOnSubmit} isAdmin={false} setIsAdmin={mockSetIsAdmin} />
      </Router>
    );
    
    expect(screen.getByText("CLIENT LOGIN")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Need an account? Register")).toBeInTheDocument();
  });

  test("switches between login and registration forms", () => {
    render(
      <Router>  {/* Wrap the LoginForm component in Router */}
        <LoginForm onSubmit={mockOnSubmit} isAdmin={false} setIsAdmin={mockSetIsAdmin} />
      </Router>
    );
    
    // Switch to Registration Form
    fireEvent.click(screen.getByText("Need an account? Register"));
    expect(screen.getByText("NEW CLIENT ACCOUNT")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    
    // Switch back to Login Form
    fireEvent.click(screen.getByText("Already have an account? Login"));
    expect(screen.getByText("CLIENT LOGIN")).toBeInTheDocument();
    expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();
  });

  test("validates email input", () => {
    render(
      <Router>  {/* Wrap the LoginForm component in Router */}
        <LoginForm onSubmit={mockOnSubmit} isAdmin={false} setIsAdmin={mockSetIsAdmin} />
      </Router>
    );
    
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    
    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    
    // Ensure the error message disappears when the email is valid
    expect(screen.queryByText(/Please enter a valid email address/)).not.toBeInTheDocument();
  });
    
  });
  
  describe("LoginForm", () => {
    test("displays success message after successful registration", async () => {
      // Mock the onSubmit function manually
      const mockOnSubmit = async (data) => {
        // Simulate successful form submission
        return { success: true };
      };
  
      // Arrange: Render LoginForm component with registration state (isLogin = false, isAdmin = false)
      render(
        <Router>  {/* Wrap the LoginForm component in Router */}
          <LoginForm onSubmit={mockOnSubmit} isAdmin={false} setIsAdmin={() => {}} />
        </Router>
      );
  
      // Switch to registration mode (if it's not already in that mode)
      fireEvent.click(screen.getByRole("button", { name: /need an account\? register/i }));
  
      // Ensure the 'Name' field is rendered (this should now be visible)
      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "john.doe@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "Test@1234" },
      });
  
      fireEvent.click(screen.getByRole("button", { name: /register/i }));
    });
  });
