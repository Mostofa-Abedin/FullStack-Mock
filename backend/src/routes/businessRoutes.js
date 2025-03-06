// Import Libraries
import express from 'express';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { authUserOrAdmin } from '../middlewares/authUserOrAdmin.js';
import { getAllBusinessesWithUserDetails, updateBusinessDetails } from '../controllers/businessController.js';

const router = express.Router();

// @Trenton- here
//router.post('/:id/onboarding', authenticateUser, registerBusiness)


// Route: GET all businesses (Publicly accessible) (For now & testing)
router.get('/', getAllBusinessesWithUserDetails);


// Route: PATCH business details (only own business or admin access)
router.patch('/update/:businessId', authenticateUser, authUserOrAdmin, updateBusinessDetails);

// POST to create a new business record
router.post('/', authenticateUser, authUserOrAdmin, createBusiness);

export default router;




