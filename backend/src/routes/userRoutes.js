// Import required libraries
import express from "express";

// Import Controllers
import {
  getAllUsers,
  createUser,
  registerUser,
  changePassword,
  updateUserProfile,
  deleteUser,
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
router.post('/:id/onboarding', authenticateUser, registerBusiness);

// Route: Change user password (Authenticated User only) 
router.patch('/change-password', authenticateUser, changePassword);

// Route: Update personal profile (Partial update allowed) (only own profile or admin access)
router.patch('/:id/profile', authenticateUser, authUserOrAdmin, updateUserProfile);


// Route: DELETE a user (protected)
router.delete("/:id", authenticateUser, authUserOrAdmin, deleteUser);


export default router;

