// A new custom middleware to handle role-based permissions.

const jwt = require('jsonwebtoken');

// Middleware to authorize either the user themselves or an admin
const authUserOrAdmin = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization ? req.headers.authorization.substring("Bearer ".length) : "";

  // If no token is found, deny access
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;

    // Allow the following:
    // Admins can edit any user or business profile
    // Users can edit their own profile (ID in the token must match the ID in the request parameter)
    if (req.user.role === 'admin' || req.user.userID === req.params.id) {
      next();
    } else {
      // Deny access if the user doesn't have permission
      return res.status(403).json({ message: 'Access Denied. You can only update your own profile.' });
    }
  } catch (error) {
    // Handle invalid tokens
    res.status(403).json({ message: 'Invalid Token.' });
  }
};

module.exports = { authUserOrAdmin };
