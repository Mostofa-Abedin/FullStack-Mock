import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard from '../components/adminDashboard/adminDashboard';
import { BrowserRouter } from 'react-router-dom';

describe('AdminDashboard', () => {
  const renderComponent = () => {
    render(
      <BrowserRouter>
        <AdminDashboard username="Admin" />
      </BrowserRouter>
    );
  };

  it('should render the dashboard with the username', () => {
    renderComponent();
    expect(screen.getByText(/Welcome, Admin!/i)).toBeInTheDocument();
  });

  it('should display the "Add Client" button', () => {
    renderComponent();
    expect(screen.getByTestId('add-client-button')).toBeInTheDocument();
  });


  it('should render a list of projects', async () => {
    renderComponent();
    
    // Wait for the "Manage Projects" text to ensure the list has loaded
    await waitFor(() => {
      expect(screen.getByText(/Manage Projects/i)).toBeInTheDocument();
    });

    // Find all instances of "Project Alpha" and ensure at least one is present
    const projectElements = screen.getAllByText(/Project Alpha/i);
    expect(projectElements.length).toBeGreaterThan(0); // Ensure we have multiple or at least one "Project Alpha"
  });

  it('should handle modal closing', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('add-client-button'));

    // Ensure the modal is displayed
    const modalTitle = screen.getByRole('heading', { name: /Add client/i });
    expect(modalTitle).toBeInTheDocument();

    // Close the modal by clicking the "Close" button
    fireEvent.click(screen.getByText(/Close/i));

    // Wait for the modal to be removed from the document
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /Add client/i })).not.toBeInTheDocument();
    });

    // Additionally, ensure that the "Add Client" button is still in the document
    expect(screen.getByTestId('add-client-button')).toBeInTheDocument();
  });
});
