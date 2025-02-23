// Import required libraries
const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, registerUser, changePassword, changeUserDetails } = require('../controllers/userController'); // Import controllers
const { registerBusiness } = require('../controllers/businessFormController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authMiddleware');

// Route: GET all users 
router.get('/', getAllUsers); 

// Route: // Create a new user
router.post('/', createUser);  

// Route: Register a new user
router.post('/register', registerUser);

router.post('/:id/onboarding', authenticateUser, registerBusiness)

router.patch('/:id/password', authenticateUser, changePassword)

router.patch('/:id/profile', authenticateUser, authorizeAdmin, changeUserDetails)



module.exports = router;
