import dotenv from 'dotenv'; // ✅ Load environment variables FIRST
dotenv.config(); // ✅ Ensure `.env` is loaded before running tests

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

// ✅ Ensure MONGO_URI is loaded before tests run
beforeAll(async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('❌ MONGO_URI is undefined. Check your .env file.');
  }
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// ✅ Clean up database before each test
beforeEach(async () => {
  await User.deleteMany({});
});

// ✅ Disconnect from MongoDB after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe('User Model', () => {

  // Test: Required fields validation
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

  // Test: Default role value
  it('should set the default role to "client"', async () => {
    const user = new User({ name: 'Test User', email: 'test@example.com', password: 'password123' });

    expect(user.role).toBe('client'); // Should default to 'client'
  });

  // Test: Email validation
  it('should validate email format', async () => {
    const user = new User({ name: 'Test User', email: 'invalid-email', password: 'password123' });

    let error;
    try {
      await user.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.email).toBeDefined(); // Invalid email should throw an error
  });

  // Test: Prevent duplicate emails
  it('should not allow duplicate emails', async () => {
    await User.create({ name: 'User One', email: 'duplicate@example.com', password: 'password123' });

    let error;
    try {
      await User.create({ name: 'User Two', email: 'duplicate@example.com', password: 'password456' });
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.code).toBe(11000); // Mongoose duplicate key error code
  });

  // Test: Password should be hashed
  it('should hash the password before saving', async () => {
    const user = await User.create({ name: 'Test User', email: 'user@example.com', password: 'mypassword123' });

    expect(user.password).not.toBe('mypassword123'); // Should not store plaintext password
    expect(user.password.startsWith('$2b$')).toBe(true); // Should be a bcrypt hash
  });


});
