import jwt from "jsonwebtoken";

// Middleware to authorize either the user themselves or an admin
const authUserOrAdmin = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization
    ? req.headers.authorization.substring("Bearer ".length)
    : "";

  // If no token is found, deny access
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;

    // If this is a business update route, let the controller verify business ownership.
    if (req.params.businessId) {
      return next();
    }

    // For other routes (like updating user profile), allow if the user is admin or updating their own profile.
    if (req.user.role === 'admin' || req.user.userID === req.params.id) {
      return next();
    }

    // Deny access if none of the conditions match
    return res.status(403).json({ message: 'Access Denied. You can only update your own profile or business.' });
  } catch (error) {
    // Handle invalid tokens
    return res.status(403).json({ message: 'Invalid Token.' });
  }
};

export { authUserOrAdmin };
