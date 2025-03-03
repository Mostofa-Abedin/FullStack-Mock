const express = require('express');
const { authenticateUser,authorizeAdmin } = require('../middlewares/authMiddleware');
const { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const router = express.Router();


// Get all announcements
router.get('/', authenticateUser, authorizeAdmin, getAnnouncements)

// Create a new announcement
router.post('/', authenticateUser, authorizeAdmin, createAnnouncement);

// Update an existing announcement
router.put('/:id', authenticateUser, authorizeAdmin, updateAnnouncement);

// Delete an announcement
router.delete('/:id', authenticateUser, authorizeAdmin, deleteAnnouncement);

module.exports = router;