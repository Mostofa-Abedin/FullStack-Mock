const User = require("../models/User")
const Business = require('../models/Business');
const mongoose = require("mongoose");
require('dotenv').config();

const dbDrop = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => console.log("✅ MongoDB connected for dropping"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
  try {
    await User.deleteMany({});
    await Business.deleteMany({});
    console.log('Database dropped successfully');
  } catch (err) {
    console.error('Error dropping database:', err);
  } finally {
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected after dropping');
  }
};

dbDrop();
