import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard from '../components/adminDashboard/adminDashboard';
import { BrowserRouter } from 'react-router-dom';

// Optionally, stub window.scrollTo to avoid errors in tests that call it
window.scrollTo = vi.fn();

describe('AdminDashboard', () => {
  let fetchSpy;

  beforeEach(() => {
    fetchSpy = vi.spyOn(window, 'fetch').mockImplementation((url) => {
      if (url.includes('/projects')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            projects: [
              {
                _id: 'proj1',
                projectName: 'Project Alpha',
                clientId: { name: 'Client A' },
                startDate: '2025-01-01',
                endDate: '2025-12-31',
              },
            ],
          }),
        });
      }
      if (url.includes('/users')) {
        return Promise.resolve({
          ok: true,
          json: async () => ([
            { _id: '1', name: 'Test Client', role: 'client', email: 'test@example.com' },
          ]),
        });
      }
      if (url.includes('/announcements')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ announcements: [] }),
        });
      }
      if (url.includes('/business')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ businesses: [] }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: async () => ({}),
      });
    });
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <AdminDashboard username="Admin" />
      </BrowserRouter>
    );
  };

  it('should render the dashboard with the username', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText(/Welcome, Admin!/i)).toBeInTheDocument();
    });
  });

  it('should display the "Add Client" button', async () => {
    renderComponent();
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
    await waitFor(() => {
      expect(screen.getByTestId('add-client-button')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('add-client-button'));

    // Ensure the modal is displayed
    const modalTitle = await screen.findByRole('heading', { name: /Add client/i });
    expect(modalTitle).toBeInTheDocument();

    // Close the modal by clicking the "Close" button
    fireEvent.click(screen.getByText(/Close/i));

    // Wait for the modal to be removed from the document
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /Add client/i })).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('add-client-button')).toBeInTheDocument();
  });
});
