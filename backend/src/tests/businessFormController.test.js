import './setup/dbSetup.js'; // Import  DB setup
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../../index.js';
import User from '../models/User.js';

// ------------------------------------------------------------------------------------------------------------------//
// SECTION: POST /user/:id/onboarding/ Tests
describe('POST /user/:id/onboarding', () => {
  
  it('should create a new business successfully', async () => {
    // To be fixed/created once testing errors have been fixed
    /* const newUser = {
      name: 'Business User',
      email: 'business@testexample.com',
      role: 'client',
      password: 'Securepassword123!'
    };
    
    await request(app).post('/users/register').send(newUser);
    
    const loginData = {
        email: newUser.email,
        password: newUser.password
    }
    const loginRes = await request(app)
                .post('/login')
                .send({loginData});
    const token = loginRes.body.token
    const newBusiness = {
        businessName: "testBusiness",
        industry: "testIndustry",
        website: "testWebsite",
        phone: "0412345678",
        address: "test address"
    }
    const user = await User.findOne({email: newUser.email})
    
    //console.log(loginRes)

    const res = await request(app)
                .post(`users/${user._id}/onboarding`)
                .set(`Bearer ${token}`)
                .send(newBusiness);

    expect(res.statusCode).toBe(200);
    expect(res.body.token.startsWith('ey')).toBe(true); //  Check JWT has been generated */
  }, 10000);

  it('should fail if fields are missing', async () => {
    //To be done once other testing errors are fixed
  });

  it('should fail if details do not match specifications (website, phone number)', async () => {
    //To be done once other testing errors are fixed
  });
});
