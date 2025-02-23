// Import required libraries
const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, registerUser, changePassword } = require('../controllers/userController'); // Import controllers
const { registerBusiness } = require('../controllers/businessFormController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { authUserOrAdmin } = require('../middlewares/authUserOrAdmin');

// Route: GET all users 
router.get('/', getAllUsers); 

// Route: // Create a new user
router.post('/', createUser);  

// Route: Register a new user
router.post('/register', registerUser);

//@Trenton- Can we move this to the newly created businessRoutes.js as this route falls under business-related logic. 
router.post('/:id/onboarding', authenticateUser, registerBusiness)

router.patch('/:id/password', authenticateUser, changePassword)


// Route: PATCH personal profile (only own profile or admin access)
router.patch('/:id/profile');

module.exports = router;
