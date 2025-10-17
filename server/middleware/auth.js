const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

const authorizeTreasurer = (req, res, next) => {
  if (req.user.role !== 'bendahara') {
    return res.status(403).json({ message: 'Access denied. Bendahara role required.' });
  }
  next();
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'administrator') {
    return res.status(403).json({ message: 'Access denied. Administrator role required.' });
  }
  next();
};

module.exports = { authenticateToken, authorizeTreasurer, authorizeAdmin };
