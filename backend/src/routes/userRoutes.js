// Import required libraries
const express = require('express');
const router = express.Router();
const { getAllUsers, createUser } = require('../controllers/userController'); // ✅ Import controllers

// Route: GET all users 
router.get('/', getAllUsers); 

// Route: // Create a new user
router.post('/', createUser);  






module.exports = router;
