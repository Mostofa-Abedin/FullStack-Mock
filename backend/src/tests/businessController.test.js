import './setup/dbSetup.js'; // ✅ Import DB setup
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import app from '../../index.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import Business from '../models/Business.js';

let adminToken, clientToken, clientId, businessId;

beforeAll(async () => {
  // Create test users
  const adminUser = await User.create({ name: 'Admin', email: 'adminBusiness@test.com', role: 'admin', password: 'password123' });
  const clientUser = await User.create({ name: 'Client', email: 'clientBusiness@test.com', role: 'client', password: 'password123' });

  clientId = clientUser._id;

  // Generate JWT tokens
  adminToken = jwt.sign({ userID: adminUser._id, role: 'admin' }, process.env.JWT_SECRET || 'secret');
  clientToken = jwt.sign({ userID: clientUser._id, role: 'client' }, process.env.JWT_SECRET || 'secret');

  // Create test project
  const business = await Business.create({
    userId: clientUser._id,
    businessName: 'ABC Solutions',
    industry: 'IT Services',
    phone: '61400123456',
    address: '123 Main St, Sydney',
    website: 'https://www.abcsolutions.com'
  });

  businessId = business._id;
});

afterAll(async () => {
  await Business.deleteMany({});
  await User.deleteMany({});
});

// ------------------------------------------------------------------------------------------------------------------//
// SECTION: GET /admin/dashboard Tests
describe('GET /business/', () => {
    it('should return all businesses', async () => {
        const res = await request(app)
        .get('/business')
        .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Businesses retrieved successfully.');

    });
});

describe('POST /business/', () => {
    it.skip('should create a new business successfully', async () => {
        const newBusiness = {
            userId: clientId,
            businessName: "testBusiness",
            industry: "testIndustry",
            website: "testWebsite",
            phone: "0412345678",
            address: "test address"
        }

        const res = await request(app)
        .post('/business')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newBusiness);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Business created successfully');
    });

    it.skip('should fail if fields are missing', async () => {
        const newBusiness = {
            businessName: "testBusiness",
            industry: "testIndustry",
            website: "testWebsite",
            phone: "0412345678"
        }
        const res = await request(app)
        .post('/business')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(newBusiness);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Missing fields');
    });

    it.skip('should fail if details do not match specifications (website, phone number)', async () => {
        const newBusiness = {
            businessName: "testBusiness",
            industry: "testIndustry",
            website: "testWebsite",
            phone: "0412345678",
            address: "test address"
        }
        const res = await request(app)
        .post('/business')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(newBusiness);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Invalid fields');
    });
})
