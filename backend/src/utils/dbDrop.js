import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Business from "../models/Business.js";

dotenv.config();

const dbDrop = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("✅ MongoDB connected for dropping");

    await User.deleteMany({});
    await Business.deleteMany({});
    console.log("Database dropped successfully");
  } catch (err) {
    console.error("Error dropping database:", err);
  } finally {
    await mongoose.disconnect();
    console.log("✅ MongoDB disconnected after dropping");
  }
};

dbDrop();
