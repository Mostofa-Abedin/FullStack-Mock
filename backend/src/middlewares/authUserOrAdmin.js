// A new custom middleware to handle role-based permissions.

const jwt = require('jsonwebtoken');

// Middleware to authorize either the user themselves or an admin
const authUserOrAdmin = (req, res, next) => {


};

module.exports = { authUserOrAdmin };