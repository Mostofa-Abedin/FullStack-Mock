import './setup/dbSetup.js'; // Import centralized DB setup
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Project from '../models/Project.js';
import User from '../models/User.js';

// ------------------------------------------------------------------------------------------------------------------//
// SECTION: Project Model Validations


describe('Project Model Validations', () => {

    it('should require clientId, projectName, status, startDate, and endDate', async () => {
      const project = new Project({});
  
      let error;
      try {
        await project.validate();
      } catch (err) {
        error = err;
      }
  
      expect(error).toBeDefined();
      expect(error.errors.clientId).toBeDefined();
      expect(error.errors.projectName).toBeDefined();
      expect(error.errors.status).toBeDefined();
      expect(error.errors.startDate).toBeDefined();
      expect(error.errors.endDate).toBeDefined();
    });

});


// ------------------------------------------------------------------------------------------------------------------