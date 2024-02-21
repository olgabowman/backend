const jwt = require('jsonwebtoken');

// Middleware function to authenticate user via JWT token
exports.authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'secret');

    // Set user in request object
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};