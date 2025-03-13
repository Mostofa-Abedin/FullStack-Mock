import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Business from "../models/Business.js";

dotenv.config();

const dbSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("✅ MongoDB Connected for seeding");

    const adminUser = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "password123", // For development/testing only
      role: "admin",
    });
    const clientUser = await User.create({
      name: "Client User",
      email: "client@example.com",
      password: "password123", // For development/testing only
      role: "client",
    });

    await Business.create({
      userId: clientUser._id,
      businessName: "Business 1",
      industry: "Test Industry",
      website: "www.test-website.com",
      phone: "0123456789",
      address: "123 Main St, Anytown, USA",
    });
    await Business.create({
      userId: adminUser._id,
      businessName: "Business 1",
      industry: "Test Industry",
      website: "www.test-website.com",
      phone: "0123456789",
      address: "123 Main St, Anytown, USA",
    });
    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await mongoose.disconnect();
    console.log("✅ MongoDB disconnected after seeding");
  }
};

dbSeed();
