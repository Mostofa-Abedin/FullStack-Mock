const Business = require('../models/Business');

// Controller: Get all businesses with user details populated
const getAllBusinessesWithUserDetails = async (req, res) => {
  try {
    const businesses = await Business.find()
      .populate('userId', 'name email role') // Populate user fields
      

    res.status(200).json({
      message: 'Businesses retrieved successfully.',
      businesses,
    });
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ message: 'An error occurred while retrieving businesses.' });
  }
};

module.exports = { getAllBusinessesWithUserDetails };