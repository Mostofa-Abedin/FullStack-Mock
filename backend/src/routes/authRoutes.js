// Import required libraries
import express from 'express';
import { loginUser } from '../controllers/authController.js'; // Import controllers
import { authenticateUser, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();


// Route: Login a new user
router.post('/', loginUser);

module.exports = router;
