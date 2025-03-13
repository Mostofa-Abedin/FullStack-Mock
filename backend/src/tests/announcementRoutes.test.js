/* import './setup/dbSetup.js'; // Centralized DB setup */
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import app from '../../index.js';
import Announcement from '../models/Announcement.js';
import Business from '../models/Business.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// ------------------------------------------------------------------------------------------------------------------//
// SECTION: Project Routes

let adminToken, clientToken, clientId, adminId, announcementId, businessId;

beforeAll(async () => {
  // Create test users
  const adminUser = await User.create({ name: 'Admin', email: 'adminAnnouncement@test.com', role: 'admin', password: 'password123' });
  const clientUser = await User.create({ name: 'Client', email: 'clientAnnouncement@test.com', role: 'client', password: 'password123' });

  clientId = clientUser._id;
  adminId = adminUser._id;

  // Generate JWT tokens
  adminToken = jwt.sign({ userID: adminUser._id, role: 'admin' }, process.env.JWT_SECRET || 'secret');
  clientToken = jwt.sign({ userID: clientUser._id, role: 'client' }, process.env.JWT_SECRET || 'secret');
  
  const business = await Business.create({
    userId: clientUser._id,
    businessName: 'ABC Solutions',
    industry: 'IT Services',
    phone: '61400123456',
    address: '123 Main St, Sydney',
    website: 'https://www.abcsolutions.com'
  });
  businessId = business._id;
  // Create test announcement
  const announcement = await Announcement.create({
    userId: clientId,
    businessId: business._id,
    title: 'Test Announcement',
    content: 'Test content for announcement',
  });
  announcementId = announcement._id;
});
afterAll(async () => {
  await Announcement.deleteMany({});
  await Business.deleteMany({});
  await User.deleteMany({});
});

// ------------------------------------------------------
// TEST: Create a Project (Admin Only)
describe('POST /announcement/', () => {
  it('should create a new announcement when user is admin', async () => {
    const res = await request(app)
      .post('/announcements') 
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
            userId: clientId,
            business: businessId,
            title: 'Test Announcement',
            content: 'Test content for announcement',
          });

    expect(res.statusCode).toBe(201);
    expect(res.body.announcement).toHaveProperty('_id');
    expect(res.body.message).toMatch("Announcement created successfully");
  });

  it ('should fail if user is not admin', async () => {
    const res = await request(app)
        .post('/announcements')
        .set('Authorization', `Bearer ${clientToken}`)
        .send({
            userId: clientId,
            business: businessId,
            title: 'Test Announcement',
            content: 'Test content for announcement',
            });
  });

  it('should fail to create announcement when missing fields'), async () => {
    const res = await request(app)
      .post('/announcements') 
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
            userId: clientId,
            business: businessId,
          });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toMatch("Failed to create announcement");
  }
});

// ------------------------------------------------------
// TEST: Get All Projects (Admin Only)
describe('GET /projects/', () => {
  it('should retrieve all announcements', async () => {
    const res = await request(app)
      .get('/announcements') 
      .set('Authorization', `Bearer ${clientToken}`);

    expect(res.statusCode).toBe(200);
  });
});

// ------------------------------------------------------
// ------------------------------------------------------
// TEST: Update Project (Admin Only)
describe('PATCH /announcements/:announcementId', () => {
  it('should update announcement', async () => {
    const res = await request(app)
      .patch(`/announcements/${announcementId}`) 
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ content: 'Edited content' });

    expect(res.statusCode).toBe(200);
    expect(res.body.announcement.content).toBe('Edited content');
  });

  it('should fail if announcement is not found', async () => {
    const res = await request(app)
      .patch(`/announcements/67ce0d8a58d9550b1402afc7`) 
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ content: 'Edited content' });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toMatch("Announcement not found");
  })

  it('should fail to update announcement with invalid data', async () => {
    const res = await request(app)
      .patch(`/announcements/${announcementId}`) 
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ active: 12 });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toMatch("Failed to update announcement");
  })

  it ('should only allow admin to update announcement', async () => {
    const res = await request(app)
      .patch(`/announcements/${announcementId}`) 
      .set('Authorization', `Bearer ${clientToken}`)
      .send({ content: 'Edited content' });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch("Access Denied. Admins only.");
  })
});

// ------------------------------------------------------
// TEST: Delete Project (Admin Only)
describe('DELETE /announcements/:projectId', () => {
  it('should delete an announcement', async () => {
    const res = await request(app)
      .delete(`/announcements/${announcementId}`) // 
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch("Announcement deleted");
  });

  it('should only allow admins to delete announcement', async () => {
    const res = await request(app)
      .delete(`/announcements/${announcementId}`) // 
      .set('Authorization', `Bearer ${clientToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch("Access Denied. Admins only.");
  })

  it('should only delete actual announcements', async () => {
    const res = await request(app)
      .delete(`/announcements/123456789`) // 
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toMatch("Failed to delete announcement");
  })
});

// ------------------------------------------------------------------------------------------------------------------//
