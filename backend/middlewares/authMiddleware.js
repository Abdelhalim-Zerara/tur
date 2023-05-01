const jwt = require('jsonwebtoken');
const User = require('../models/User');
const expressAsyncHandler = require('express-async-handler');
require('dotenv').config();


async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    
    const token = authHeader.split(' ')[1];
  
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decodedToken.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = expressAsyncHandler(protect);