// Import required libraries
const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, registerUser } = require('../controllers/userController'); // Import controllers

// Route: GET all users 
router.get('/', getAllUsers); 

// Route: // Create a new user
router.post('/', createUser);  

// Route: Register a new user
router.post('/register', registerUser);  



module.exports = router;
