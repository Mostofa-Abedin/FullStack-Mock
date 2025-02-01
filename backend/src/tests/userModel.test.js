import { describe, it, expect } from 'vitest';
import mongoose from 'mongoose';
import User from '../models/User.js';

describe('User Model', () => {
  it('should create a user with required fields', () => {
    const user = new User({ name: 'Test User', email: 'test@example.com', role: 'user' });
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('user');
  });

  it('should require an email', async () => {
    const user = new User({ name: 'No Email' });
    let error;
    try {
      await user.validate();
    } catch (err) {
      error = err;
    }
    expect(error.errors.email).toBeDefined();
  });
});
