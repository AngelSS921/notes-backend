const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token provided, authorization denied' });

  try {
    // Expecting token format: "Bearer <token>"
    const tokenString = token.split(" ")[1] || token;
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.user = decoded; // Adds the decoded payload (user ID) to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid or expired' });
  }
};

module.exports = authMiddleware;
