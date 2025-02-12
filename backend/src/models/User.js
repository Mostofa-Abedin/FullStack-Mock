// Import the Mongoose library
const mongoose = require('mongoose');

// Define a schema for the User model
const UserSchema = new mongoose.Schema({
  // Name field - must be a string and is required
  name: { type: String, required: true },

  // Email field - must be a string, required, and must be unique in the database
  email: { type: String, required: true, unique: true },

  // Role field - must be a string, only accepts 'client' or 'admin', defaults to 'client' if not provided
  role: { type: String, enum: ['client', 'admin'], default: 'client' },

}, { 
  timestamps: true // Timestamp added so that we have createdAt: a date representing when this document was created & updatedAt: a date representing when this document was last updated.
});

// Prevent model overwrite during testing
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Export the User model so it can be used in other parts of the application
module.exports = User;
