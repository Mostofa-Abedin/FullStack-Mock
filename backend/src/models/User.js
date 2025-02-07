// Import the Mongoose library
const mongoose = require('mongoose');

// Define a schema for the User model
const UserSchema = new mongoose.Schema({
  // Name field - must be a string and is required
  name: { type: String, required: true },

  // Email field - must be a string, required, and must be unique in the database
  email: { type: String, required: true, unique: true },

  // Role field - must be a string, only accepts 'user' or 'admin', defaults to 'user' if not provided
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// Check if the 'User' model is already defined to prevent overwriting (useful in testing environments)
// If the model exists, use the existing one; otherwise, create a new model using the defined schema
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Export the User model so it can be used in other parts of the application
module.exports = User;
