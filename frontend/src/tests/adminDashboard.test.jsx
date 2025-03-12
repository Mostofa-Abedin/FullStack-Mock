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

  it('should display the "Add Client" button', async () => {
    renderComponent();
    
    // Wait for the button in case it appears asynchronously
    await waitFor(() => {
      expect(screen.getByTestId('add-client-button')).toBeInTheDocument();
    });
  });

  it('should render a list of projects', async () => {
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText(/Manage Projects/i)).toBeInTheDocument();
    });

    const projectElements = screen.getAllByText(/Project Alpha/i);
    expect(projectElements.length).toBeGreaterThan(0);
  });

  it('should handle modal closing', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('add-client-button'));

    const modalTitle = screen.getByRole('heading', { name: /Add client/i });
    expect(modalTitle).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Close/i));

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /Add client/i })).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('add-client-button')).toBeInTheDocument();
  });
});
