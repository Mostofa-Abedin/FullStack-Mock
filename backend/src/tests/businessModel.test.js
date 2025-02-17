import './setup/dbSetup.js'; // Import centralized DB setup
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Business from '../models/Business.js';
import User from '../models/User.js';

// ------------------------------------------------------------------------------------------------------------------//
// SECTION: Business Model Validations

describe(' Business Model Validations', () => {

    it('should require userId, businessName, industry, phone, and address', async () => {
    const business = new Business({});

    let error;
    try {
        await business.validate();
    } catch (err) {
        error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.userId).toBeDefined();
    expect(error.errors.businessName).toBeDefined();
    expect(error.errors.industry).toBeDefined();
    expect(error.errors.phone).toBeDefined();
    expect(error.errors.address).toBeDefined();
    });
  
    it('should validate phone number format', async () => {
        const business = new Business({
          userId: new User(), // Mock user reference
          businessName: 'FunkySkunk Solutions',
          industry: 'IT Services',
          phone: '12345', 
          address: '123 Opera house, Sydney'
        });
    
        let error;
        try {
          await business.validate();
        } catch (err) {
          error = err;
        }
    
        expect(error).toBeDefined();
        expect(error.errors.phone).toBeDefined();
        expect(error.errors.phone.message).toMatch(/Invalid phone number format/);
    });    
  

    it('should validate website URL format', async () => {
        const business = new Business({
            userId: new User(), 
            businessName: 'ABC Solutions',
            industry: 'IT Services',
            phone: '+61-400-123-456',
            address: '123 Main St, Sydney',
            website: 'invalid-url' 
        });

        let error;
        try {
            await business.validate();
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.errors.website).toBeDefined();
        expect(error.errors.website.message).toMatch(/Invalid website URL/);
    });
    
    it('should allow valid business data to be saved', async () => {
        const user = await User.create({ name: 'John Doe', email: 'johndoe@example.com', password: 'password123' });
    
        const business = new Business({
          userId: user._id, 
          businessName: 'Technolol Solutions',
          industry: 'Software Development',
          phone: '+61-400-123-456',
          address: '456 TechMex St, Sydney',
          website: 'https://techmexsolutions.com'
        });
    
        const savedBusiness = await business.save();
        expect(savedBusiness._id).toBeDefined();
        expect(savedBusiness.createdAt).toBeDefined();
        expect(savedBusiness.updatedAt).toBeDefined();
      });
    

});
// -----------------------------------------------------------------------------------------------------------------