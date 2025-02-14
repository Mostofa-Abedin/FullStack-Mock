import './setup/dbSetup.js'; // Import centralized DB setup
import { describe, it, expect } from 'vitest';
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
  
    
  
});
// -----------------------------------------------------------------------------------------------------------------