const express = require('express');
const router = express.Router();
const User = require('../models/User');


// @route GET /users
// @desc Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route POST /users
// @desc Add a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const user = new User({ name, email, role , password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
