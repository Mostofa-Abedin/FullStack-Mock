import './setup/dbSetup.js'; // Import  DB setup
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../../index.js';
import User from '../models/User.js';

// ------------------------------------------------------------------------------------------------------------------//
// SECTION: GET /users Tests
describe('GET /users', () => {
  it('should return an empty array if no users exist', async () => {
    await User.deleteMany({}); //  Ensure database is clean
    const count = await User.countDocuments();
    console.log(` User count before test: ${count}`); //  Log user count
  
    const res = await request(app).get('/users');
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array); //  Ensure response is an array
    expect(res.body.length).toBe(0); //  Expect no users initially
  });
  

  it('should return the created user', async () => {
    await User.create({ 
      name: 'Test User', 
      email: 'test@example.com', 
      role: 'client', 
      password: 'password123' 
    });

    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Test User');
    expect(res.body[0].role).toBe('client');
    expect(res.body[0]).toHaveProperty('createdAt');
    expect(res.body[0]).toHaveProperty('updatedAt');
    expect(new Date(res.body[0].updatedAt)).toBeInstanceOf(Date);
  });
});

// ------------------------------------------------------------------------------------------------------------------//
// SECTION: POST /users/register Tests
describe('POST /users/register', () => {
  
  it('should register a new user successfully', async () => {
    const newUser = {
      name: 'Register User',
      email: 'register@example.com',
      role: 'client',
      password: 'securepassword123'
    };

    const res = await request(app).post('/users/register').send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.user.name).toBe(newUser.name);
    expect(res.body.user.email).toBe(newUser.email);
    expect(res.body.user.role).toBe('client');
    expect(res.body.user.password).not.toBe(newUser.password); //  Ensure password is hashed
    expect(res.body.user.password.startsWith('$2b$')).toBe(true); //  Check bcrypt hash
  });

  it('should not allow duplicate emails', async () => {
    const userData = {
      name: 'Duplicate User',
      email: 'duplicate@example.com',
      role: 'client',
      password: 'password123'
    };

    // Create user first
    await User.create(userData);

    // Attempt to register the same email
    const res = await request(app).post('/users/register').send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('User with this email already exists');
  });

  it('should return validation error for missing fields', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'Missing Fields'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User validation failed/);
  });

  it('should return validation error for invalid email', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'Invalid Email User',
      email: 'invalid-email',
      role: 'client',
      password: 'securepassword123'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User validation failed/);
  });
});

// ------------------------------------------------------------------------------------------------------------------//
// SECTION: Model Validations
describe('Model Validations', () => {
  
  it('should require name, email, and password', async () => {
    const user = new User({});

    let error;
    try {
      await user.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
    expect(error.errors.email).toBeDefined();
    expect(error.errors.password).toBeDefined();
  });

  it('should set the default role to "client"', async () => {
    const user = new User({ name: 'Test User', email: 'test@example.com', password: 'password123' });

    expect(user.role).toBe('client'); // Should default to 'client'
  });

  it('should validate email format', async () => {
    const user = new User({ name: 'Test User', email: 'invalid-email', password: 'password123' });

    let error;
    try {
      await user.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.email).toBeDefined(); // Invalid email should throw an error
  });

  it('should hash the password before saving', async () => {
    const user = await User.create({ name: 'Test User', email: 'user@example.com', password: 'mypassword123' });

    expect(user.password).not.toBe('mypassword123'); // Should not store plaintext password
    expect(user.password.startsWith('$2b$')).toBe(true); // Should be a bcrypt hash
  });
});
