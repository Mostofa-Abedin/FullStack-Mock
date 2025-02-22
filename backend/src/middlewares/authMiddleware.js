//Import JWT
const jwt = require('jsonwebtoken');

//Middleware to verify role from JWT
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied. Admins only.' });
    }
    next();
};

//  Middleware to verify JWT token
// @TRENTON- FYI Wrote this middleware to authenticate the fact that the user has a token
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization.substring("Bearer ".length);
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret"); // @Trenton - I've kept the || "secret" for now as we haven't set a JWT_SECRET yet. 
        req.user = decoded; //  Attach decoded user info to `req`
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid Token.' });
    }
};
module.exports = { authenticateUser, authorizeAdmin };