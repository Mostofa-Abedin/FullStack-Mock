import './setup/dbSetup.js'; // ✅ Import DB setup
import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import app from '../../index.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// ------------------------------------------------------------------------------------------------------------------//
// SECTION: GET /admin/dashboard Tests
describe('GET /admin/dashboard', () => {
  
  let adminToken, clientToken;

  // Create dummy test users and generate tokens
  beforeAll(async () => {
    // Create an admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@testexample.com',
      role: 'admin',
      password: 'password123'
    });

    // Create a client user
    const clientUser = await User.create({
      name: 'Client User',
      email: 'client@testexample.com',
      role: 'client',
      password: 'password123'
    });

    // Generate JWT tokens
    adminToken = jwt.sign(
      { userID: adminUser._id, role: adminUser.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    clientToken = jwt.sign(
      { userID: clientUser._id, role: clientUser.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );
  });

  it('should allow an admin to access the admin dashboard', async () => {
    const res = await request(app)
      .get('/admin/dashboard')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Welcome to the Admin Dashboard.');
  });

  it('should deny a client access to the admin dashboard', async () => {
    const res = await request(app)
      .get('/admin/dashboard')
      .set('Authorization', `Bearer ${clientToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Access Denied. Admins only.');
  });

  it('should deny access if no token is provided', async () => {
    const res = await request(app).get('/admin/dashboard');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Access Denied. No token provided.');
  });

});
