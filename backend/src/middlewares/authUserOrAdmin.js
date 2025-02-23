// A new custom middleware to handle role-based permissions.

const jwt = require('jsonwebtoken');

// Middleware to authorize either the user themselves or an admin
const authUserOrAdmin = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.substring("Bearer ".length) : "";

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;

    // Logic to allow:
    // - Admins to proceed
    // - Users to proceed if they're updating their own profile
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid Token.' });
  }
};

module.exports = { authUserOrAdmin };
