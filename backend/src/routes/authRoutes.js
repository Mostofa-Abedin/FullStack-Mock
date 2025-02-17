// Import required libraries
const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController'); // Import controllers
const { authenticateUser,authorizeAdmin } = require('../middlewares/authMiddleware');

// Route: Login a new user
router.post('/', loginUser);

module.exports = router;
