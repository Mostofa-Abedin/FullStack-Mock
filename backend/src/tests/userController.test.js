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
    email: "adminUser@test.com",
    role: "admin",
    password: "password123",
  });
  const clientUser = await User.create({
    name: "Client",
    email: "clientUser@test.com",
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
  it("should change password successfully", async () => {
    const password = {
      password: "password234",
    };
    const url = `/users/${clientId}/profile`;
    const res = await request(app)
      .patch(url)
      .set(`Authorization`, `Bearer ${clientToken}`)
      .send(password);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User profile updated successfully."); //  Check JWT has been generated
  });

  it("should fail if user details are incorrect", async () => {
    const badEmail = { email: "bademail" };
    const url = `/users/${clientId}/profile`;
    const res = await request(app)
      .patch(url)
      .set(`Authorization`, `Bearer ${clientToken}`)
      .send(badEmail);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).not.toBe("User profile updated successfully.");
  });

  it("should fail if user tries to change role", async () => {
    const newRole = { role: "admin" };
    const url = `/users/${clientId}/profile`;
    const res = await request(app)
      .patch(url)
      .set(`Authorization`, `Bearer ${clientToken}`)
      .send(newRole);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Only admins can update user roles.");
  })
});

describe("DELETE /users/:id", () => {
  
  it("should delete user successfully", async () => {
    const url = `/users/${clientId}`;
    const res = await request(app)
      .delete(url)
      .set(`Authorization`, `Bearer ${clientToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted successfully.");
  });

  it("should fail if user does not exist", async () => {
    const url = `/users/${clientId}`;
    const res = await request(app)
      .delete(url)
      .set(`Authorization`, `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found.");
  });
})
