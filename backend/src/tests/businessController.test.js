/* import './setup/dbSetup.js'; // ✅ Import DB setup */
import request from "supertest";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import app from "../../index.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Business from "../models/Business.js";

let adminToken, clientToken, clientId, businessId;

// ------------------------------------------------------------------------------------------------------------------//
// SECTION: GET /admin/dashboard Tests
describe("Business Controller Tests", () => {
    beforeEach(async () => {
        // Create test users
        const adminUser = await User.create({
          name: "Admin",
          email: "adminBusiness@test.com",
          role: "admin",
          password: "password123",
        });
        const clientUser = await User.create({
          name: "Client",
          email: "clientBusiness@test.com",
          role: "client",
          password: "password123",
        });
      
        clientId = clientUser._id;
      
        // Generate JWT tokens
        adminToken = jwt.sign(
          { userID: adminUser._id, role: "admin" },
          process.env.JWT_SECRET || "secret"
        );
        clientToken = jwt.sign(
          { userID: clientUser._id, role: "client" },
          process.env.JWT_SECRET || "secret"
        );
      
        // Create test business
        const business = await Business.create({
          userId: clientUser._id,
          businessName: "ABC Solutions",
          industry: "IT Services",
          phone: "61400123456",
          address: "123 Main St, Sydney",
          website: "https://www.abcsolutions.com",
        });
      
        businessId = business._id;
      });
      
      afterEach(async () => {
        await Business.deleteMany({});
        await User.deleteMany({});
      });
  describe("GET /business/", () => {
    it("should return all businesses", async () => {
      const res = await request(app)
        .get("/business")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Businesses retrieved successfully.");
    });
  });

  describe("POST /business/", () => {
    it("should create a new business successfully", async () => {
      const newBusiness = {
        userId: clientId,
        businessName: "testBusiness",
        industry: "testIndustry",
        website: "https://www.testWebsite.com",
        phone: "61412345678",
        address: "123 test address",
      };

      const res = await request(app)
        .post("/business")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newBusiness);
      expect(res.body.message).toBe("Business created successfully");
      expect(res.statusCode).toBe(201);
    });

    it("should fail if fields are missing", async () => {
      const newBusiness = {
        businessName: "testBusiness",
        industry: "testIndustry",
        website: "http://www.testWebsite.com",
        phone: "0412345678",
      };
      const res = await request(app)
        .post("/business")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newBusiness);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Missing required fields");
    });

    it("should fail if details do not match specifications (website))", async () => {
      const newBusiness = {
        userId: clientId,
        businessName: "testBusiness",
        industry: "testIndustry",
        website: "testWebsite",
        phone: "0412345678",
        address: "test address",
      };
      const res = await request(app)
        .post("/business")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newBusiness);

      expect(res.statusCode).not.toBe(200);
      expect(res.body.message).toBe(
        "Business validation failed: website: Invalid website URL"
      );
    });
    it("should fail if details do not match specifications (phone number)", async () => {
      const newBusiness = {
        userId: clientId,
        businessName: "testBusiness",
        industry: "testIndustry",
        website: "http://www.testWebsite.com",
        phone: "123",
        address: "test address",
      };
      const res = await request(app)
        .post("/business")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newBusiness);

      expect(res.statusCode).not.toBe(200);
      expect(res.body.message).toBe(
        "Business validation failed: phone: Invalid phone number format"
      );
    });
  });

  describe("PATCH /business/:id", () => {
    it("should update a business successfully", async () => {
      const updatedBusiness = {
        businessName: "updatedBusiness",
        industry: "updatedIndustry",
        website: "https://www.updatedWebsite.com",
        phone: "61412345678",
        address: "123 updated address",
      };
      const url = `/business/update/${businessId}`;
      const res = await request(app)
        .patch(url)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updatedBusiness);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Business details updated successfully.");
    });
    it("should fail is business ID is invalid", async () => {
      const updatedBusiness = {
        businessName: "updatedBusiness",
        industry: "updatedIndustry",
        website: "https://www.updatedWebsite.com",
        phone: "61412345678",
        address: "123 updated address",
      };
      const url = `/business/update/12345`;
      const res = await request(app)
        .patch(url)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updatedBusiness);

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid Business ID format.");
    });
    it("should fail if user does not own business", async () => {
      const newUser = await User.create({
        name: "Different User",
        email: "differentemail@email.com",
        password: "password123",
      });
      const differentUserToken = jwt.sign(
        { userID: newUser._id, role: "client" },
        process.env.JWT_SECRET || "secret"
      );
      const updatedBusiness = {
        businessName: "updatedBusiness",
        industry: "updatedIndustry",
        website: "https://www.updatedWebsite.com",
        phone: "61412345678",
        address: "123 updated address",
      };
      const url = `/business/update/${businessId}`;
      const res = await request(app)
        .patch(url)
        .set("Authorization", `Bearer ${differentUserToken}`)
        .send(updatedBusiness);

      expect(res.statusCode).toBe(403);
      expect(res.body.message).toBe(
        "Access Denied. You can only update your own profile or business."
      );
    });
    it("should fail if phone number is invalid", async () => {
      const updatedBusiness = {
        businessName: "updatedBusiness",
        industry: "updatedIndustry",
        website: "https://www.updatedWebsite.com",
        phone: "123",
        address: "123 updated address",
      };
      const url = `/business/update/${businessId}`;
      const res = await request(app)
        .patch(url)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updatedBusiness);
      console.log(res.body);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid phone number format.");
    });

    it("should fail if website is invalid", async () => {
      const updatedBusiness = {
        businessName: "updatedBusiness",
        industry: "updatedIndustry",
        website: "updatedWebsitecom",
        phone: "61412345678",
        address: "123 updated address",
      };
      const url = `/business/update/${businessId}`;
      const res = await request(app)
        .patch(url)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updatedBusiness);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid website URL.");
    });
  });
});
