const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authMiddleware");
const { authUserOrAdmin } = require("../middlewares/authUserOrAdmin");