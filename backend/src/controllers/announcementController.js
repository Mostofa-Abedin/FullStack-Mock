// Import any necessary modules or models
import Announcement from '../models/Announcement.js';

const getAnnouncements = async (req, res) => {
    try {
        // Find all announcements in the database
        const announcements = await Announcement.find();
        res.status(200).json({
            message: 'Announcements retrieved successfully.',
            announcements,
          });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get announcements' });
    }
}

const createAnnouncement = async (req, res) => {
    // Extract the necessary data from the request body
    const { title, business, content } = req.body;

    const userId = req.user.userID;
    // Create a new announcement object
    const newAnnouncement = {
        userId,
        businessId: business,
        title,
        content,
    };

    try {
        // Save the new announcement to the database
        const announcement = await Announcement.create(newAnnouncement);
        res.status(201).json({ message: 'Announcement created successfully', announcement});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create announcement' });
    }
};

const updateAnnouncement = async (req, res) => {
    // Extract the announcement ID from the request parameters
    const { id } = req.params;

    // Extract the updated data from the request body
    const { user, title, business, content, active  } = req.body;

    try {
        // Find the announcement in the database by ID and update its properties
        const announcement = await Announcement.findByIdAndUpdate(id, { user, businessId: business, title, content, active }, { new: true });
        if (announcement) {
            res.json({message: 'Announcement updated', announcement} );
        } else {
            res.status(404).json({ error: 'Announcement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update announcement' });
    }
};

const deleteAnnouncement = async (req, res) => {
    // Extract the announcement ID from the request parameters
    const { id } = req.params;

    try {
        // Find the announcement in the database by ID and remove it
        const announcement = await Announcement.findByIdAndRemove(id);
        if (announcement) {
            res.json({ message: 'Announcement deleted' });
        } else {
            res.status(404).json({ error: 'Announcement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete announcement' });
    }
};

export { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement };