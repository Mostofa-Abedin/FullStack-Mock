require('dotenv').config(); // ✅ Load environment variables first
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Ensure MongoDB URI is properly loaded
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is missing. Check your .env file.');
  process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Atlas Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/users', userRoutes);

// Only start the server when NOT running tests
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app; // ✅ Exporting app for testing
