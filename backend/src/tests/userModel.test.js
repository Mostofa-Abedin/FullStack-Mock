import dotenv from 'dotenv'; // ✅ Load environment variables FIRST
dotenv.config(); // ✅ Ensure `.env` is loaded before running tests

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import User from '../models/User.js';

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

// ✅ Disconnect from MongoDB after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe('User Model', () => {

  it('should create a user with required fields and default role', () => {
    const user = new User({ name: 'Test User', email: 'test@example.com' });

    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('client'); // ✅ Fixed expected role
  });

  it('should require an email', async () => {
    const user = new User({ name: 'No Email' });

    let error;
    try {
      await user.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.email).toBeDefined(); // ✅ Ensuring validation error for missing email
  });

});
