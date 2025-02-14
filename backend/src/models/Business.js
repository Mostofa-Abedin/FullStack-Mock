// Import the Mongoose library
const mongoose = require('mongoose');

// Define a schema for the Business model
const BusinessSchema = new mongoose.Schema({
  
   // Reference to the User model - Ensures each business is linked to a user
   userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true // This field is required to associate the business with a user
  },

  // Business Name - Required, must be a string, and trimmed to remove extra spaces
  businessName: { 
    type: String, 
    required: true, 
    maxlength: 100 
  },

  // Industry - Required, must be a string, and trimmed
  industry: { 
    type: String, 
    required: true, 
    maxlength: 50 
  },

  // Website - Optional field, must follow a valid URL format
  website: { 
    type: String, 
  },

  // Phone Number - Required, must follow a standardized format
  phone: { 
    type: String, 
    required: true, 
  },

  // Address - Required, must be a string, and trimmed
  address: { 
    type: String, 
    required: true, 
    maxlength: 255 // Limits address length to a reasonable value
  } 

}, { 
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Prevent model overwrite during testing
const Business = mongoose.models.Business || mongoose.model('Business', BusinessSchema);

module.exports = Business;


