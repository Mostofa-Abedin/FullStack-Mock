// Import required libraries
import express from 'express';
import { authenticateUser, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();



// Admin protected route via middleware
// @Perri - Use this route for the admin dashboard.
router.get('/dashboard', authenticateUser, authorizeAdmin, (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard." });
});

module.exports = router;