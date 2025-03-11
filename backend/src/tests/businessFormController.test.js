import './setup/dbSetup.js'; // Import  DB setup
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../../index.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
let adminToken, clientToken, clientId, adminId;

beforeAll(async () => {
  // Create test users
  const adminUser = await User.create({ name: 'Admin', email: 'adminOnboarding@test.com', role: 'admin', password: 'password123' });
  const clientUser = await User.create({ name: 'Client', email: 'clientOnboarding@test.com', role: 'client', password: 'password123' });

  clientId = clientUser._id;
  adminId = adminUser._id;

  // Generate JWT tokens
  adminToken = jwt.sign({ userID: adminUser._id, role: 'admin' }, process.env.JWT_SECRET || 'secret');
  clientToken = jwt.sign({ userID: clientUser._id, role: 'client' }, process.env.JWT_SECRET || 'secret');
});
// ------------------------------------------------------------------------------------------------------------------//
// SECTION: POST /user/:id/onboarding/ Tests
describe.skip('POST /users/:id/onboarding', () => {
  
  it.skip('should create a new business successfully', async () => {
    // To be fixed/created once testing errors have been fixed
    const newBusiness = {
        businessName: "testBusiness",
        industry: "testIndustry",
        website: "testWebsite",
        phone: "0412345678",
        address: "test address"
    }
    const res = await request(app)
                .post(`users/${clientId}/onboarding`)
                .set('Authorization', `Bearer ${clientToken}`)
                .send(newBusiness);
    expect(res.statusCode).toBe(200);
    expect(res.body.token.startsWith('ey')).toBe(true); //  Check JWT has been generated
  });

  it('should fail if fields are missing', async () => {
    const newBusiness = {
        businessName: "testBusiness",
        industry: "testIndustry",
        website: "testWebsite",
        phone: "0412345678"
    }
    const res = await request(app)
                .post(`users/${clientId}/onboarding`)
                .set('Authorization', `Bearer ${clientToken}`)
                .send(newBusiness);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Missing fields');
  });

  it('should fail if details do not match specifications (website, phone number)', async () => {
    const newBusiness = {
        businessName: "testBusiness",
        industry: "testIndustry",
        website: "testWebsite",
        phone: "0412345678",
        address: "test address"
    }
    const res = await request(app)
                .post(`users/${clientId}/onboarding`)
                .set('Authorization', `Bearer ${clientToken}`)
                .send(newBusiness);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid fields');
  });
});
