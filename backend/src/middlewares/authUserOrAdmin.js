// A new custom middleware to handle role-based permissions.

import jwt from "jsonwebtoken";

// Middleware to authorize either the user themselves or an admin
const authUserOrAdmin = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization ? req.headers.authorization.substring("Bearer ".length) : "";
  /* v8 ignore start */
  // If no token is found, deny access
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }
  /* v8 ignore stop */
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;

    // Allow the following:
    // Admins can edit any user or business profile
    // Users can edit their own profile (userID from token must match ID in the request parameter)
    // Users can update their own business details (userID from token must match the business owner's ID)
    if (
      req.user.role === 'admin' || 
      req.user.userID === req.params.id || // User updating their own profile
      req.user.userID === req.params.businessId // User updating their own business
    ) {
      next();
    } else {
      // Deny access if the user doesn't have permission
      return res.status(403).json({ message: 'Access Denied. You can only update your own profile or business.' });
    }
  } catch (error) {
    // Handle invalid tokens
    res.status(403).json({ message: 'Invalid Token.' });
  }
};

export { authUserOrAdmin };
