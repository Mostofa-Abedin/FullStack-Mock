// Import required libraries
const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController'); // Import controllers

// Route: Login a new user
router.post('/', loginUser);

module.exports = router;
