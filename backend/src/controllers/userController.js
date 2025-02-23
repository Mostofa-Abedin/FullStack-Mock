const User = require('../models/User');
const bcrypt = require('bcrypt');

// Controller: Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller: Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const user = new User({ name, email, role, password }); // Password hashing handled in model
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller: Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create a new user (Password hashing handled in the User model)
    const user = new User({ name, email, role, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller: Change password (I think Separate route needed? )
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const userID = req.user.userID;
    const user = await User.findOne({ _id: userID });

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Wrong password.",
      });
    }

    user.password = newPassword;
    // Updates password in db
    await user.save();

    res.status(201).json({ message: 'User password changed successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Initial Pseudocode: Update Personal Details- WAT DO?
 * PATCH /users/:id/profile
 *
 * - Ensure the user is authenticated (or admin).
 * - Allow partial updates (name, email).
 * - Only admin can update the role.
 * - Validate input fields (email format, etc.).
 * - Return updated user details.
 */
const updateUserProfile = async (req, res) => {
  // recommend: Add logic here to update user details
  // - Check if user is authorized (self or admin)
  // - Update fields like name, email
  // - Validate fields (use regex for email)
  // - Save and return updated user

  // Step 1: Ensure that only the user or an admin can update the profile
  if (req.user.role !== 'admin' && req.user.userID !== id) {
    return res.status(403).json({ message: 'Access Denied. You can only update your own profile.' });
  }

  try {
    const user = await User.findById(id);
  }
};

/**
 * Pseudocode: Admin Updates Any User - wAT DO?
 * PATCH /admin/users/:id
 *
 * - Admin-only route.
 * - Full access to update user fields, including role.
 * - Validate inputs and handle errors.
 */
const adminUpdateUser = async (req, res) => {
  // recommend: Add admin-only logic
  // - Admin can update any field including role
  // - Handle validation of all fields
  // - Return updated user info
};

// Export controllers
module.exports = {
  getAllUsers,
  createUser,
  registerUser,
  changePassword,
  updateUserProfile, // 🔥 New: Will implement step-by-step, me thinks
  adminUpdateUser,   // 🔥 New: Will implement step-by-step, me thinks
};
