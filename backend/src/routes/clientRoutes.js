// Import Libraries
import express from 'express';
import { authenticateUser, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// We'll use this file for client dashboard.
// @Perri - Use this route for the client dashboard

router.get('/dashboard', authenticateUser, (req, res) => {
    res.json({ message: "Welcome to the Client Dashboard." });
});

export default router;
