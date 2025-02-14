// Import the Mongoose library
const mongoose = require('mongoose');

// Define a schema for the Business model
const BusinessSchema = new mongoose.Schema({
  
  

}, { 
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Prevent model overwrite during testing
const Business = mongoose.models.Business || mongoose.model('Business', BusinessSchema);

module.exports = Business;


