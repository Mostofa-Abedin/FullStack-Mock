import express from 'express';
import { authenticateUser, authorizeAdmin } from '../middlewares/authMiddleware.js';
import  { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/announcementController.js';
const router = express.Router();

// Get all active announcements
router.get('/', authenticateUser, getAnnouncements)

// Create a new announcement
router.post('/', authenticateUser, authorizeAdmin, createAnnouncement);

// Update an existing announcement
router.patch('/:id', authenticateUser, authorizeAdmin, updateAnnouncement);

// Delete an announcement
router.delete('/:id', authenticateUser, authorizeAdmin, deleteAnnouncement);

export default router;