// Import Libraries
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authMiddleware');
const { authUserOrAdmin } = require('../middlewares/authUserOrAdmin');

// @Trenton- here
//router.post('/:id/onboarding', authenticateUser, registerBusiness)


// Route: PATCH business details (only own business or admin access)
router.patch('/:id', authenticateUser, authUserOrAdmin,);

module.exports = router;