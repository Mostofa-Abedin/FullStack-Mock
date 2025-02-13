// Import the Mongoose library
const mongoose = require('mongoose');
// Import Bcrypt
const bcrypt = require('bcrypt');

// Define a schema for the User model
const UserSchema = new mongoose.Schema({
  // Name field - must be a string and is required
  name: { type: String, required: true },

  // Email field - must be a string, required, and must be unique in the database
  email: { type: String, required: true, unique: true },

  // Role field - must be a string, only accepts 'client' or 'admin', defaults to 'client' if not provided
  role: { type: String, enum: ['client', 'admin'], default: 'client' },

  // Hashed Password - The password will be hashed and stored here using the Pre-save middleware
  password: { type: String, required: true }

}, { 
  timestamps: true // Timestamp added so that we have createdAt: a date representing when this document was created & updatedAt: a date representing when this document was last updated.
});

// Pre-save middleware to hash passwords before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) { // Only hash if password is modified
    try {
      // Check if password is already hashed (Note: bcrypt hashes always start with "$2b$")
      if (!this.password.startsWith("$2b$")) {
        this.password = await bcrypt.hash(this.password, 10); // Delay added for hashing
      }
    } catch (error) {
      return next(error); //  Pass error to next middleware if hashing fails
    }
  }
  next(); 
});


// Prevent model overwrite during testing
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Export the User model so it can be used in other parts of the application
module.exports = User;
