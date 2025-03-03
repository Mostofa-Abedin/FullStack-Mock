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

it('should validate project status to be within allowed values', async () => {
    const project = new Project({
      clientId: new User(),
      projectName: 'Invalid Status Test',
      status: 'InvalidStatus', // Invalid status
      description: 'Testing invalid status',
      startDate: new Date(),
      endDate: new Date()
    });

    let error;
    try {
      await project.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.status).toBeDefined();
    expect(error.errors.status.message).toMatch(/`InvalidStatus` is not a valid enum value/);
  });

  it('should ensure startDate is before endDate', async () => {
    const project = new Project({
      clientId: new User(),
      projectName: 'Date Order Test',
      status: 'In Progress',
      description: 'Testing startDate after endDate',
      startDate: new Date('2025-12-01'), // Future date
      endDate: new Date('2025-01-01') // Earlier than startDate
    });

    let error;
    try {
      await project.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.endDate).toBeDefined();
    expect(error.errors.endDate.message).toMatch(/End date must be after start date/);

    it('should allow valid project data to be saved', async () => {
        const user = await User.create({ name: 'Jane Doe', email: 'janedoe@example.com', password: 'securepass123' });
    
        const project = new Project({
          clientId: user._id,
          projectName: 'Valid Project',
          status: 'In Progress',
          description: 'A properly structured project',
          startDate: new Date('2024-06-01'),
          endDate: new Date('2024-12-01')
        });
    
        const savedProject = await project.save();
        expect(savedProject._id).toBeDefined();
        expect(savedProject.createdAt).toBeDefined();
        expect(savedProject.updatedAt).toBeDefined();
      });
  });


// ------------------------------------------------------------------------------------------------------------------