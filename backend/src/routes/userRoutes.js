// Import required libraries
const express = require('express');
const router = express.Router();

// Import Controllers
const { getAllUsers, createUser, registerUser, changePassword, updateUserProfile   } = require('../controllers/userController'); // Import controllers
const { registerBusiness } = require('../controllers/businessFormController');


//Import Middlewares
const { authenticateUser } = require('../middlewares/authMiddleware');
const { authUserOrAdmin } = require('../middlewares/authUserOrAdmin');

// Route: GET all users 
// (Need to add authentication in the future) (Admin or Authenticated User)
router.get('/', getAllUsers); 

// Route: Create a new user
// (Need to add authentication in the future) (Admin only)
router.post('/', createUser);  

// Route: Register a new user (Public)
// Perhaps this should move to authRoutes?
router.post('/register', registerUser);

// Route: Onboard/Register business (Client only)
//@Trenton- Can we move this to the newly created businessRoutes.js as this route falls under business-related logic. 
router.post('/:id/onboarding', authenticateUser, registerBusiness)

// Route: Change user password (Authenticated User only) 
//@Trenton- You wrote this? It uses the authenticateUser middleware that verify if a token exist. However, it seems that we don't have any authorization. 
// Which could imply that anybody with the right ID can change the password?
// Do you think it should look like the route below?
// Is it redundant now that I have the one below?
router.patch('/:id/password', authenticateUser, changePassword)

// Route: Update personal profile (Partial update allowed) (only own profile or admin access)
router.patch('/:id/profile', authenticateUser, authUserOrAdmin, updateUserProfile);

module.exports = router;
