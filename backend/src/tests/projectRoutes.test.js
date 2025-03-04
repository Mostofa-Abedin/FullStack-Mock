import './setup/dbSetup.js'; // Centralized DB setup
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import app from '../../index.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// ------------------------------------------------------------------------------------------------------------------//
// SECTION: Project Routes

let adminToken, clientToken, clientId, projectId;

beforeAll(async () => {
  // Create test users
  const adminUser = await User.create({ name: 'Admin', email: 'admin@test.com', role: 'admin', password: 'password123' });
  const clientUser = await User.create({ name: 'Client', email: 'client@test.com', role: 'client', password: 'password123' });

  clientId = clientUser._id;

  // Generate JWT tokens
  adminToken = jwt.sign({ userID: adminUser._id, role: 'admin' }, process.env.JWT_SECRET || 'secret');
  clientToken = jwt.sign({ userID: clientUser._id, role: 'client' }, process.env.JWT_SECRET || 'secret');

  // Create test project
  const project = await Project.create({
    clientId: clientId,
    projectName: 'Test Project',
    status: 'In Progress',
    description: 'A test project',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31')
  });

  projectId = project._id;
});

afterAll(async () => {
  await Project.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close(); // ✅ Close DB connection after tests
});

// ------------------------------------------------------
// TEST: Create a Project (Admin Only)
describe('POST /projects/', () => {
  it('should create a new project when user is admin', async () => {
    const res = await request(app)
      .post('/projects') 
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        clientId,
        projectName: 'New Project',
        status: 'In Progress',
        description: 'Another test project',
        startDate: '2024-06-01',
        endDate: '2024-12-31'
      });

      console.log("🔍 Test Response Body:", res.body); // ✅ Added for debugging

    expect(res.statusCode).toBe(201);
    expect(res.body.project).toHaveProperty('_id');
    expect(res.body.message).toMatch(/Project created successfully/);
  });

  it('should return 403 if client tries to create a project', async () => {
    const res = await request(app)
      .post('/projects') 
      .set('Authorization', `Bearer ${clientToken}`)
      .send({
        clientId,
        projectName: 'Client Project',
        status: 'Pending',
        description: 'Should fail',
        startDate: '2024-06-01',
        endDate: '2024-12-31'
      });

    expect(res.statusCode).toBe(403);
  });
});

// ------------------------------------------------------
// TEST: Get All Projects (Admin Only)
describe('GET /projects/', () => {
  it('should retrieve all projects when user is admin', async () => {
    const res = await request(app)
      .get('/projects') 
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.projects.length).toBeGreaterThan(0);
  });

  it('should return 403 if client tries to get all projects', async () => {
    const res = await request(app)
      .get('/projects') 
      .set('Authorization', `Bearer ${clientToken}`);

    expect(res.statusCode).toBe(403);
  });
});

// ------------------------------------------------------
// TEST: Get All Projects (Public)
describe('GET /projects/public/all', () => {
  it('should retrieve all projects without authentication', async () => {
    const res = await request(app).get('/projects/public/all'); 
    expect(res.statusCode).toBe(200);
    expect(res.body.projects.length).toBeGreaterThan(0);
  });
});

// ------------------------------------------------------
// TEST: Get Projects by Client ID
describe('GET /projects/:clientId', () => {
  it('should retrieve projects for the authenticated client', async () => {
    const res = await request(app)
      .get(`/projects/${clientId}`) 
      .set('Authorization', `Bearer ${clientToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.projects.length).toBeGreaterThan(0);
  });

  it('should return 403 if admin tries to get a specific client’s projects', async () => {
    const res = await request(app)
      .get(`/projects/${clientId}`) 
      .set('Authorization', `Bearer ${adminToken}`);

    console.log("Admin trying to access client projects:", res.body); // ✅ Added for debugging

    expect(res.statusCode).toBe(403);
  });
});

// ------------------------------------------------------
// TEST: Update Project (Admin Only)
describe('PATCH /projects/:projectId', () => {
  it('should update project when user is admin', async () => {
    const res = await request(app)
      .patch(`/projects/${projectId}`) 
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'Completed' });

    expect(res.statusCode).toBe(200);
    expect(res.body.project.status).toBe('Completed');
  });

  it('should return 403 if client tries to update project', async () => {
    const res = await request(app)
      .patch(`/projects/${projectId}`) 
      .set('Authorization', `Bearer ${clientToken}`)
      .send({ status: 'Completed' });

    expect(res.statusCode).toBe(403);
  });
});

// ------------------------------------------------------
// TEST: Delete Project (Admin Only)
describe('DELETE /projects/:projectId', () => {
  it('should delete a project when user is admin', async () => {
    const res = await request(app)
      .delete(`/projects/${projectId}`) // 
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Project deleted successfully/);
  });

  it('should return 403 if client tries to delete project', async () => {
    const res = await request(app)
      .delete(`/projects/${projectId}`) // 
      .set('Authorization', `Bearer ${clientToken}`);

    expect(res.statusCode).toBe(403);
  });
});

// ------------------------------------------------------------------------------------------------------------------//
