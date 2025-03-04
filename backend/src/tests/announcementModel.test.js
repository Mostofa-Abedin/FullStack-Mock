import './setup/dbSetup.js'; //  Import  DB setup
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Announcement from '../models/Announcement.js';
import User from '../models/User.js';
import Business from '../models/Business.js';

// ------------------------------------------------------------------------------------------------------------------//
// SECTION: Announcement Model Validations
let clientUser, business;
beforeAll(async () => {
    // Create a client user
    clientUser = await User.create({
        name: 'Client User',
        email: 'changepassword@testexample.com',
        role: 'client',
        password: 'password123'
      });
    // Create a business
    business = await Business.create({
        userId: clientUser._id,
        businessName: 'ABC Solutions',
        industry: 'IT Services',
        phone: '61400123456',
        address: '123 Main St, Sydney',
        website: 'https://www.abcsolutions.com'
      });
    });

describe('Announcement Model Validations', () => {

  it('should require title, businessId, userId content', async () => {
    const announcement = new Announcement({});
    let error;
    try {
      await announcement.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.title).toBeDefined();
    expect(error.errors.businessId).toBeDefined();
    expect(error.errors.content).toBeDefined();
  });
    
  it('should set the default active to true', async () => {
        const announcement = new Announcement({ title: 'Test Announcement', businessId: business._id, content: 'test content' });
    
        expect(announcement.active).toBe(true); //  Should default to true
    });

    it('should create a new announcement successfully', async () => {
        const announcement = new Announcement({ userId: clientUser._id, title: 'Test Announcement', businessId: business._id, content: 'test content' });
    
        let error;
        try {
          await announcement.validate();
        } catch (err) {
          error = err;
        }
    
        expect(error).toBeUndefined();
    });
});

// -----------------------------------------------------------------------------------------------------------------
