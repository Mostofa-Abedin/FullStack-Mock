const User = require("../models/User");
const Business = require("../models/Business");
const mongoose = require("mongoose");
require('dotenv').config();

const dbSeed = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => console.log("✅ MongoDB Connected for seeding"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
  try {
    const adminUser = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "password123",
      role: "admin",
    });
    const clientUser = await User.create({
      name: "Client User",
      email: "client@example.com",
      password: "password123",
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
    return console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected after seeding');
  }
};

dbSeed();
