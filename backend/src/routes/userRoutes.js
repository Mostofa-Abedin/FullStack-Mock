// Import required libraries
import express from "express";

// Import Controllers
import {
  getAllUsers,
  createUser,
  registerUser,
  changePassword,
  updateUserProfile,
} from "../controllers/userController.js";
import { registerBusiness } from "../controllers/businessFormController.js";

// Import Middlewares
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { authUserOrAdmin } from "../middlewares/authUserOrAdmin.js";

const router = express.Router();

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
