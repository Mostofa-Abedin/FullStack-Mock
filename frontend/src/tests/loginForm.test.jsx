import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import LoginForm from "../components/loginForm/loginForm"; // Adjust import as necessary
import userEvent from "@testing-library/user-event";

describe("LoginForm", () => {
  let mockOnSubmit, mockSetIsAdmin;

  test("renders form for login by default", () => {
    render(<LoginForm onSubmit={mockOnSubmit} isAdmin={false} setIsAdmin={mockSetIsAdmin} />);
    
    expect(screen.getByText("CLIENT LOGIN")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Need an account? Register")).toBeInTheDocument();
  });

  test("switches between login and registration forms", () => {
    render(<LoginForm onSubmit={mockOnSubmit} isAdmin={false} setIsAdmin={mockSetIsAdmin} />);
    
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
    render(<LoginForm onSubmit={mockOnSubmit} isAdmin={false} setIsAdmin={mockSetIsAdmin} />);
    
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    
    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    
    expect(screen.queryByText("Please enter a valid email address.")).not.toBeInTheDocument();
  });

  test("validates password input for registration", async () => {
    render(<LoginForm onSubmit={mockOnSubmit} isAdmin={false} setIsAdmin={mockSetIsAdmin} />);
    
    fireEvent.click(screen.getByText("Need an account? Register"));
    
    const passwordInput = screen.getByLabelText("Password");
    
    // Test invalid password
    fireEvent.change(passwordInput, { target: { value: "weak" } });
    expect(screen.getByText("Password must be at least 8 characters, include one uppercase letter, one number, and one special character.")).toBeInTheDocument();
    
    // Test valid password
    fireEvent.change(passwordInput, { target: { value: "Strong@123" } });
    expect(screen.queryByText("Password must be at least 8 characters, include one uppercase letter, one number, and one special character.")).not.toBeInTheDocument();
  });

  
  describe("LoginForm", () => {
    test("displays success message after successful registration", async () => {
      // Mock the onSubmit function manually
      const mockOnSubmit = async (data) => {
        // Simulate successful form submission
        return { success: true };
      };
  
      // Arrange: Render LoginForm component with registration state (isLogin = false, isAdmin = false)
      render(<LoginForm onSubmit={mockOnSubmit} isAdmin={false} setIsAdmin={() => {}} />);
  
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
  
      // Act: Submit the form (click the 'Register' button)
      fireEvent.click(screen.getByRole("button", { name: /register/i }));
  
      // Assert: Wait for success message to appear
      await waitFor(() => {
        expect(screen.getByText("Form submitted successfully!")).toBeInTheDocument();
      });
    });
  });
  
});
