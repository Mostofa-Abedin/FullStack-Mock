// Import Libraries

const express = require('express');
const router = express.Router();

// We'll use this file for client dashboard.
// @Perri - Use this route for the client dashboard

router.get('/client/dashboard', authenticateUser, (req, res) => {
    res.json({ message: "Welcome to the Client Dashboard." });
});

module.exports = router;