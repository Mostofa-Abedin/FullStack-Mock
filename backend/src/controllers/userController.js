const User = require('../models/User');
const bcrypt = require('bcrypt')

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
    const user = new User({ name, email, role, password }); // Password hashing is being handled in model
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
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Same regex as frontend, (minimum 8 characters, at least one number, one uppercase letter, and one special character)
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password does not match requirements" });
      }
      // Create a new user (Password hashing handled in the User model)
      const user = new User({ name, email, role, password });
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  const changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      
      const userID = req.user.userID
      const user = await User.findOne({_id: userID})

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password)

      if (!isPasswordValid) {
        return res
        .status(400)
        .json({
            message: "Wrong password."
        })
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Same regex as frontend, (minimum 8 characters, at least one number, one uppercase letter, and one special character)
      
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({ message: "New password does not match requirements" });
      }
      user.password = newPassword
      // Updates password in db
      await user.save();
      res.status(201).json({ message: 'User password changed successfully'});
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
  };

  const changeUserDetails = async (req, res) => {
    const userID = req.params.id
    const { name, email, role } = req.body;
    try {  
      const existingUser = await User.findOne({ _id: userID });
      
      if (!existingUser) {
        return res.status(400).json({ message: 'User with this email does not exist' });
      }

      existingUser.name = name || existingUser.name
      existingUser.email = email || existingUser.email
      existingUser.role = role || existingUser.role

      await existingUser.save()
      res.status(201).json({ message: 'User details changed successfully'});
      } catch (err) {
        console.log(err.code)
        if (err.code == 11000) {
          return res.status(400).json({ message: `User with this email ${email} already exists` });
        }
        res.status(400).json({ message: err.message });
      }
    }




// Export controllers
module.exports = { getAllUsers, createUser, registerUser, changePassword, changeUserDetails };
