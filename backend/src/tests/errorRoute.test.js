import { describe, expect, it } from "vitest";
import request from 'supertest';
import app from '../../index.js';

describe('GET /invalid-route', () => {
    it('should return 404 error for invalid route', async () => {
    const res = await request(app)
        .get('/invalid-route')
        
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch("Route not found");
    });
})
    