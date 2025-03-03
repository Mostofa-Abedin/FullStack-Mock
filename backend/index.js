// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes')
const adminRoutes = require('./src/routes/adminRoutes');
const clientRoutes = require('./src/routes/clientRoutes')
const businessRoutes = require('./src/routes/businessRoutes');
const projectRoutes = require("./src/routes/projectRoutes");

// Initialize Express app
const app = express();

app.use(cors({
  origin: ["https://full-stack-mock-six.vercel.app", "http://127.0.0.1:5000", "http://localhost:5000"],  // Allow frontend on Vercel & local dev
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true  // Allow cookies & auth headers if needed
}));
app.use(express.json());
// Ensure MongoDB URI exists
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is missing. Check your .env file.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Define routes
console.log("✅ Loading userRoutes...");
app.use('/users', userRoutes);
app.use('/login', authRoutes);

app.use('/admin', adminRoutes);
app.use('/client', clientRoutes)

app.use('/business', businessRoutes);

app.use("/projects", projectRoutes);

// Export app (without starting server)
module.exports = app;
