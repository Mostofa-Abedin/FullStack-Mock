import "./setup/dbSetup.js"; // Import  DB setup
import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";
import app from "../../index.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
let adminToken, clientToken, clientId, adminId;

beforeAll(async () => {
  // Create test users
  const adminUser = await User.create({
    name: "Admin",
    email: "admin@test.com",
    role: "admin",
    password: "password123",
  });
  const clientUser = await User.create({
    name: "Client",
    email: "client@test.com",
    role: "client",
    password: "password123",
  });

  clientId = clientUser._id;
  adminId = adminUser._id;

  // Generate JWT tokens
  adminToken = jwt.sign(
    { userID: adminUser._id, role: "admin" },
    process.env.JWT_SECRET || "secret"
  );
  clientToken = jwt.sign(
    { userID: clientUser._id, role: "client" },
    process.env.JWT_SECRET || "secret"
  );
});

afterAll(async () => {
  await User.deleteMany({});
});
describe("PATCH /users/:id/profile", () => {
  it.skip("should change password successfully", async () => {
    const password = {
      password: "password234",
    };
    const res = await request(app)
      .patch(`/users/${clientId}/profile/`)
      .set(`Authorization`, `Bearer ${clientToken}`)
      .send(password);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User profile updated successfully"); //  Check JWT has been generated
  });

  it.skip("should fail if user details are incorrect", async () => {
    const badEmail = { email: "bademail" };
    const res = await request(app)
      .patch(`/users/${clientId}/profile`)
      .set(`Authorization`, `Bearer ${clientToken}`)
      .send(badEmail);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found.");
  });
});
