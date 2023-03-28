import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const isUser = asyncHandler(async (req, res, next) => {
  const token = req.signedCookies.userToken;

  if (token) {
    let decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedData) {
      req.body.decodedId = decodedData?.id;
      req.body.token = token;
      next();
    }
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const token = req.signedCookies.userToken;
    if (!token) {
      return res.status(401).json({
        message: 'Please login first',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    if (req.user.role === 'admin') {
      next();
    } else {
      throw new Error('Only admin can access here');
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
