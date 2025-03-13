import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import app from '../../index.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import Business from '../models/Business.js';
let adminToken, clientToken, clientId, adminId;

beforeEach(async () => {
  // Create test users
  const adminUser = await User.create({ name: 'Admin', email: 'adminOnboarding@test.com', role: 'admin', password: 'password123' });
  const clientUser = await User.create({ name: 'Client', email: 'clientOnboarding@test.com', role: 'client', password: 'password123' });

  clientId = clientUser._id;
  adminId = adminUser._id;

  // Generate JWT tokens
  adminToken = jwt.sign({ userID: adminUser._id, role: 'admin' }, process.env.JWT_SECRET || 'secret');
  clientToken = jwt.sign({ userID: clientUser._id, role: 'client' }, process.env.JWT_SECRET || 'secret');
});

afterEach(async () => {
  await User.deleteMany({});
});
// ------------------------------------------------------------------------------------------------------------------//
// SECTION: POST /user/:id/onboarding/ Tests
describe('POST /users/:id/onboarding', () => {
  
  it('should create a new business successfully', async () => {
    const newBusiness = {
      userId: clientId,
      businessName: "testBusiness",
      industry: "testIndustry",
      website: "https://www.testWebsite.com",
      phone: "61412345678",
      address: "123 test address"
  }
  const url = `/users/${clientId}/onboarding`;
    const res = await request(app)
                .post(url)
                .set('Authorization', `Bearer ${clientToken}`)
                .send(newBusiness);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Business onboarded successfully');
  });

  it('should fail if fields are missing', async () => {
    const newBusiness = {
        businessName: "testBusiness",
        industry: "testIndustry",
        website: "testWebsite",
        phone: "0412345678"
    }
    const url = `/users/${clientId}/onboarding`;
    const res = await request(app)
                .post(url)
                .set('Authorization', `Bearer ${clientToken}`)
                .send(newBusiness);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Missing required fields');
  });

  it('should fail if details do not match specifications (website, phone number)', async () => {
    const newBusiness = {
        businessName: "testBusiness",
        industry: "testIndustry",
        website: "testWebsite",
        phone: "0412345678",
        address: "test address"
    }
    const url = `/users/${clientId}/onboarding`;
    const res = await request(app)
                .post(url)
                .set('Authorization', `Bearer ${clientToken}`)
                .send(newBusiness);
    expect(res.statusCode).toBe(400);
    expect(res.body.message.website.message).toBe('Invalid website URL');
  });
});
