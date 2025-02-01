import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../index.js';
import User from '../models/User.js';
import dotenv from 'dotenv'; // ✅ Load environment variables
dotenv.config(); // ✅ Ensure `.env` is loaded before running tests

// Connect to MongoDB before running tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Clean up database before each test
beforeEach(async () => {
  await User.deleteMany({}); // ✅ Ensures test data is wiped before running
});

// Close MongoDB connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('User API Routes', () => {
  it('GET /users should return an empty array initially', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /users should create a new user', async () => {
    const newUser = { name: 'Test User', email: 'test@example.com', role: 'user' };
    const res = await request(app).post('/users').send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(newUser.name);
    expect(res.body.email).toBe(newUser.email);
  });

  it('GET /users should return the created user', async () => {
    await User.create({ name: 'Test User', email: 'test@example.com', role: 'user' });
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Test User');
  });
});
