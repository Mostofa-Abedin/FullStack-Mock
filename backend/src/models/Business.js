// Import the Mongoose library
import mongoose from "mongoose";

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
    trim: true, // To remove space if it is at the beginning or end of the string 
    maxlength: 100 
  },

  // Industry - Required, must be a string, and trimmed
  industry: { 
    type: String, 
    required: true,
    trim: true, // To remove space if it is at the beginning or end of the string  
    maxlength: 50 
  },

  // Website - Optional field, must follow a valid URL format
  website: { 
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}\/?$/, 'Invalid website URL'] // Validates URL structure 
  },

  // Phone Number - Required, must follow a standardized format
  phone: { 
    type: String, 
    required: true, 
    trim: true,
    match: [/^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{3}$/, 'Invalid phone number format'] // Ensures proper phone format
  },

  // Address - Required, must be a string, and trimmed
  address: { 
    type: String, 
    required: true,
    trim: true, // To remove space if it is at the beginning or end of the string  
    maxlength: 255 // Limits address length to a reasonable value
  } 

}, { 
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Prevent model overwrite during testing
const Business = mongoose.models.Business || mongoose.model('Business', BusinessSchema);

module.exports = Business;


