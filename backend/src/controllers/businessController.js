import mongoose from "mongoose";
import Business from "../models/Business.js";

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

// Controller: Update Business Details
const updateBusinessDetails = async (req, res) => {
  const { businessId } = req.params; // Business ID from the URL
  const updates = req.body;  // Fields to update
  const userId = req.user.userID; // Extracted from JWT token
  const userRole = req.user.role;

  // Step 1: Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(businessId)) {
    return res.status(400).json({ message: 'Invalid Business ID format.' });
  }

  try {
    // Step 2: Find the business
    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({ message: 'Business not found.' });
    }

    // Step 3: Allow update if user is owner or admin
    if (business.userId.toString() !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: 'Access Denied. You can only update your own business.' });
    }

    // Step 4: Perform partial updates
    if (updates.businessName) business.businessName = updates.businessName.trim();
    if (updates.industry) business.industry = updates.industry.trim();
    if (updates.website) {
      const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}\/?$/;
      if (!websiteRegex.test(updates.website)) {
        return res.status(400).json({ message: 'Invalid website URL.' });
      }
      business.website = updates.website;
    }
    if (updates.phone) {
      const phoneRegex = /^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{3}$/;
      if (!phoneRegex.test(updates.phone)) {
        return res.status(400).json({ message: 'Invalid phone number format.' });
      }
      business.phone = updates.phone;
    }
    if (updates.address) business.address = updates.address.trim();

    // Step 5: Save updated business
    await business.save();

    res.status(200).json({
      message: 'Business details updated successfully.',
      business,
    });
  } catch (error) {
    console.error('Error updating business:', error);
    res.status(500).json({ message: 'An error occurred while updating the business.', error });
  }
};

export { updateBusinessDetails, getAllBusinessesWithUserDetails };
