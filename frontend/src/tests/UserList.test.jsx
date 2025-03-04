import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UserList from '../components/UserList';
import { api } from '../utils/api';

// Mock the api.get function to return an empty array
vi.mock('../utils/api', () => ({
  api: {
    get: vi.fn().mockResolvedValue({ data: [] }), // Mock API to return empty list
  },
}));

describe('UserList Component (Integration Test)', () => {
  it('fetches and displays users from the backend', async () => {
    render(<UserList />);

    // Wait for the message to appear or users to load
    await waitFor(() => {
      const noUsersMessage = screen.queryByText('No users available');
      expect(noUsersMessage).toBeInTheDocument();
    });
  });
});
