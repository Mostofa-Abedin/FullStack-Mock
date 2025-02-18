// Import Libraries

const express = require('express');
const router = express.Router();
const { authenticateUser,authorizeAdmin } = require('../middlewares/authMiddleware');

// We'll use this file for client dashboard.
// @Perri - Use this route for the client dashboard

router.get('/dashboard', authenticateUser, (req, res) => {
    res.json({ message: "Welcome to the Client Dashboard." });
});

module.exports = router;