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
// Initialize Express app
const app = express();

app.use(cors({
  origin: "*",  // ✅ Temporarily allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
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

// Debugging
console.log("✅ Registered Routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`${Object.keys(middleware.route.methods).join(', ').toUpperCase()} -> ${middleware.route.path}`);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((subMiddleware) => {
      if (subMiddleware.route) {
        console.log(
          `${Object.keys(subMiddleware.route.methods).join(', ').toUpperCase()} -> ${subMiddleware.route.path}`
        );
      }
    });
  }
});


// Export app (without starting server)
module.exports = app;
