// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes');

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

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
app.use('/users', userRoutes);

// Export app (without starting server)
module.exports = app;
