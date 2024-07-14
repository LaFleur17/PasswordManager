const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log('Decoded token:', decodedToken);

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      console.log('User not found with ID:', decodedToken.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    console.log('Authenticated user:', user);
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticate };

