import dotenv from 'dotenv'; // ✅ Load environment variables FIRST
dotenv.config(); // ✅ Ensure `.env` is loaded before running tests

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../index.js';
import User from '../models/User.js';

// ✅ Ensure MONGO_URI is loaded
if (!process.env.MONGO_URI) {
  throw new Error('❌ MONGO_URI is undefined. Check your .env file.');
}

// ✅ Increase timeout for MongoDB connection
beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected for tests');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}, 20000); // ⬅️ Extended timeout to 20 seconds to prevent test failures

// ✅ Clean up database before each test (only if connected)
beforeEach(async () => {
  if (mongoose.connection.readyState === 1) {
    await User.deleteMany({});
  }
});

// ✅ Ensure database disconnects properly
afterAll(async () => {
  await mongoose.disconnect();
  console.log('✅ MongoDB disconnected after tests');
});

describe('User API Routes', () => {
  
  it('GET /users should return an empty array initially', async () => {
    const res = await request(app).get('/users');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /users should create a new user with timestamps', async () => {
    const newUser = { 
      name: 'Test User', 
      email: 'test@example.com', 
      role: 'client'  // ✅ Updated from 'user' to 'client' per new schema 
    };

    const res = await request(app).post('/users').send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(newUser.name);
    expect(res.body.email).toBe(newUser.email);
    expect(res.body.role).toBe('client'); // ✅ Ensuring correct default role is set
    expect(res.body).toHaveProperty('createdAt'); // ✅ Ensures timestamp exists
    expect(res.body).toHaveProperty('updatedAt');
    expect(new Date(res.body.updatedAt)).toBeInstanceOf(Date); // ✅ Check valid timestamp
  });

  it('GET /users should return the created user', async () => {
    const user = await User.create({ 
      name: 'Test User', 
      email: 'test@example.com', 
      role: 'client'  // ✅ Updated to match new schema
    });

    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Test User');
    expect(res.body[0].role).toBe('client');
    expect(res.body[0]).toHaveProperty('createdAt'); // ✅ Ensuring timestamps are included
    expect(res.body[0]).toHaveProperty('updatedAt');
    expect(new Date(res.body[0].updatedAt)).toBeInstanceOf(Date); // ✅ Check valid timestamp
  });

  it('should require an email', async () => {
    const user = new User({ name: 'No Email' });
    
    let error;
    try {
      await user.validate();
    } catch (err) {
      error = err;
    }

    expect(error.errors.email).toBeDefined(); // ✅ Email is required in new schema
  });

});
