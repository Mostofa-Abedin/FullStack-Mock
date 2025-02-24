// Import Libraries
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authMiddleware');
const { authUserOrAdmin } = require('../middlewares/authUserOrAdmin');
const { getAllBusinessesWithUserDetails, updateBusinessDetails } = require('../controllers/businessController');

// @Trenton- here
//router.post('/:id/onboarding', authenticateUser, registerBusiness)


// Route: GET all businesses (Publicly accessible) (For now & testing)
router.get('/', getAllBusinessesWithUserDetails);


// Route: PATCH business details (only own business or admin access)
router.patch('/:id', authenticateUser, authUserOrAdmin, updateBusinessDetails);

module.exports = router;