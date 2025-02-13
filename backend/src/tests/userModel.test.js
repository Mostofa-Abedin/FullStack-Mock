import '../setup/dbSetup.js'; //  Import  DB setup
import { describe, it, expect } from 'vitest';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

// ------------------------------------------------------------------------------------------------------------------//
// SECTION: User Model Validations
describe('User Model Validations', () => {

  it('should require name, email, and password', async () => {
    const user = new User({});

    let error;
    try {
      await user.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
    expect(error.errors.email).toBeDefined();
    expect(error.errors.password).toBeDefined();
  });

  it('should set the default role to "client"', async () => {
    const user = new User({ name: 'Test User', email: 'test@example.com', password: 'password123' });

    expect(user.role).toBe('client'); //  Should default to 'client'
  });

  it('should validate email format', async () => {
    const user = new User({ name: 'Test User', email: 'invalid-email', password: 'password123' });

    let error;
    try {
      await user.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.email).toBeDefined(); //  Invalid email should throw an error
  });

  it('should not allow duplicate emails', async () => {
    await User.create({ name: 'User One', email: 'duplicate@example.com', password: 'password123' });

    let error;
    try {
      await User.create({ name: 'User Two', email: 'duplicate@example.com', password: 'password456' });
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.code).toBe(11000); //  Mongoose duplicate key error code
  });
});

// -----------------------------------------------------------------------------------------------------------------
