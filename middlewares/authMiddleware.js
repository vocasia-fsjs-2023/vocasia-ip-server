const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  // Auth logic
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const user = await User.findByPk(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = authMiddleware;
