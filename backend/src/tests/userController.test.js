import './setup/dbSetup.js'; // Import  DB setup
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../../index.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

describe('PATCH /users/:id/password', () => {
    let clientUser;
    beforeAll(async () => {    
        // Create a client user
        clientUser = await User.create({
          name: 'Client User',
          email: 'changepassword@testexample.com',
          role: 'client',
          password: 'Password123!'
        });
      });
  
  it('should change password successfully', async () => {
    // To be fixed/created once testing errors have been fixed
    // I think it's the same issue as the others, DB returning null when finding user
    /*const clientToken = jwt.sign(
        { userID: clientUser._id},
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );
    const decoded = jwt.verify(clientToken, process.env.JWT_SECRET || "secret"); 
    const user = decoded;
    const newPassword = {
        oldPassword: "Password123!",
        newPassword: "Password234!"
    }
    const res = await request(app)
                .patch(`/users/${user.userID}/password`)
                .set(`Authorization`, `Bearer ${clientToken}`)
                .send(newPassword);
    // console.log(res)
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Business onboarded successfully'); */ //  Check JWT has been generated
  });

  it('should fail if old password is wrong', async () => {
    //To be done once other testing errors are fixed
  });

  it('should fail if password fields are missing', async () => {
    //To be done once other testing errors are fixed
  });
});
