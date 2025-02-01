import React from 'react'; // ✅ Ensure React is imported
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserList from '../components/UserList';

describe('UserList Component', () => {
  it('renders user list', () => {
    render(<UserList />);
    expect(screen.getByText('John Doe - john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith - jane@example.com')).toBeInTheDocument();
  });
});
