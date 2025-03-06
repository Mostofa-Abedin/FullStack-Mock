import mongoose from "mongoose";
import Business from "../models/Business.js";
import User from "../models/User.js"; // Needed to confirm the user is a client

// Controller: Get all businesses with user details populated
const getAllBusinessesWithUserDetails = async (req, res) => {
  try {
    const businesses = await Business.find()
      .populate("userId", "name email role"); // Populate user fields
    res.status(200).json({
      message: "Businesses retrieved successfully.",
      businesses,
    });
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving businesses." });
  }
};

//  Controller: Create a new Business record

const createBusiness = async (req, res) => {
  // Decide which userId to attach to this business
  let userId = req.user.userID; // default to the logged-in user

  // If admin is creating on behalf of a client, use req.body.userId
  if (req.user.role === "admin" && req.body.userId) {
    userId = req.body.userId;
  }

  // Pull out business fields
  const { businessName, industry, website, phone, address } = req.body;

  // Basic validation
  if (!businessName || !industry || !website || !phone || !address) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Confirm the user (client) exists and is actually a client
    const userDoc = await User.findById(userId);
    if (!userDoc) {
      return res.status(404).json({ message: "User not found." });
    }
    if (userDoc.role !== "client") {
      return res
        .status(400)
        .json({ message: "User is not a client. Cannot create a business." });
    }

    // Create new business document
    const business = new Business({
      userId,
      businessName: businessName.trim(),
      industry: industry.trim(),
      website,
      phone,
      address: address.trim(),
    });

    await business.save();
    return res
      .status(201)
      .json({ message: "Business created successfully", business });
  } catch (err) {
    console.error("Error creating business:", err);
    res.status(400).json({ message: err.message });
  }
};

// Controller: Update Business Details
const updateBusinessDetails = async (req, res) => {
  const { businessId } = req.params; // Business ID from the URL
  const updates = req.body; // Fields to update
  const userId = req.user.userID; // Extracted from JWT token
  const userRole = req.user.role;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(businessId)) {
    return res.status(400).json({ message: "Invalid Business ID format." });
  }

  try {
    // Find the business
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found." });
    }

    // Allow update if user is owner or admin
    if (business.userId.toString() !== userId && userRole !== "admin") {
      return res.status(403).json({
        message: "Access Denied. You can only update your own business.",
      });
    }

    // Perform partial updates
    if (updates.businessName) {
      business.businessName = updates.businessName.trim();
    }
    if (updates.industry) {
      business.industry = updates.industry.trim();
    }
    if (updates.website) {
      const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}\/?$/;
      if (!websiteRegex.test(updates.website)) {
        return res
          .status(400)
          .json({ message: "Invalid website URL." });
      }
      business.website = updates.website;
    }
    if (updates.phone) {
      const phoneRegex = /^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{3}$/;
      if (!phoneRegex.test(updates.phone)) {
        return res
          .status(400)
          .json({ message: "Invalid phone number format." });
      }
      business.phone = updates.phone;
    }
    if (updates.address) {
      business.address = updates.address.trim();
    }

    // Save updated business
    await business.save();
    return res.status(200).json({
      message: "Business details updated successfully.",
      business,
    });
  } catch (error) {
    console.error("Error updating business:", error);
    res.status(500).json({
      message: "An error occurred while updating the business.",
      error,
    });
  }
};

export {
  getAllBusinessesWithUserDetails,
  createBusiness,
  updateBusinessDetails,
};
