//Import JWT
const jwt = require('jsonwebtoken');

//Middleware to verify role from JWT
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied. Admins only.' });
    }
    next();
};

module.exports = { authorizeAdmin };