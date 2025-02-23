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

  const { id } = req.params; // Extract user ID from the request parameters
  const updates = req.body;

  // Step 1: Ensure only the user or an admin can update the profile
  if (req.user.role !== 'admin' && req.user.userID !== id) {
    return res.status(403).json({ message: 'Access Denied. You can only update your own profile.' });
  }

  try {
    // Step 2: Find user by ID
    const user = await User.findById(id);

    // Step 3: Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Step 4: Partial updates for fields

    // Name Update
    if (updates.name) {
      user.name = updates.name.trim(); // Remove extra spaces
    }

    // Email Validation
    if (updates.email) {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(updates.email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
      }
      user.email = updates.email;
    }

    // Role update only allowed for admins
    if (updates.role && req.user.role === 'admin') {
      user.role = updates.role;
    } else if (updates.role) {
      return res.status(403).json({ message: 'Only admins can update user roles.' });
    }

  
    // Password validation and hashing
    if (updates.password) {
      if (updates.password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
      }
      user.password = await bcrypt.hash(updates.password, 10);
    } 
    // Step 5: Save the updated user
    await user.save();

    // Step 6: Return updated user info without password
    const { password, ...updatedUser } = user.toObject();
    res.status(200).json({
      message: 'User profile updated successfully.',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the user profile.', error });
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
