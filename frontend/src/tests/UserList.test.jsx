import React from 'react';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import UserList from '../components/UserList';
import { api } from '../utils/api';

describe('UserList Component (Integration Test)', () => {
  let users;

  // ✅ Before tests, fetch real users from the backend
  beforeAll(async () => {
    const response = await api.get('/users'); // 🔥 REAL API CALL
    users = response.data;
  });

  it('fetches and displays users from the backend', async () => {
    render(<UserList />);

    await waitFor(() => {
      users.forEach((user) => {
        expect(screen.getByText(`${user.name} - ${user.email}`)).toBeInTheDocument();
      });
    });
  });

  afterAll(() => {
    users = null;
  });
});
