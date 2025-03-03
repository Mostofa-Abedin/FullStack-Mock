// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import clientRoutes from "./src/routes/clientRoutes.js";
import businessRoutes from "./src/routes/businessRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";

// Initialize Express app
const app = express();

app.use(
  cors({
    origin: [
      "https://full-stack-mock-six.vercel.app",
      "http://127.0.0.1:5000",
      "http://localhost:5000",
    ], // Allow frontend on Vercel & local dev
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies & auth headers if needed
  })
);
app.use(express.json());

// Ensure MongoDB URI exists
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing. Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define routes
console.log("✅ Loading userRoutes...");
app.use("/users", userRoutes);
app.use("/login", authRoutes);
app.use("/admin", adminRoutes);
app.use("/client", clientRoutes);
app.use("/business", businessRoutes);
app.use("/projects", projectRoutes);

// Export app (without starting server)
export default app;
