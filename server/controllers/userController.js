import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc  Register user
// @rout  POST /api/register

export const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ name, email, phone, password: hashedPassword });

      await user.save();
      res.status(201).send(user);
    } else {
      throw new Error('User already Exists!');
    }
  } catch (error) {
    next(error);
  }
});

// @desc  login
// @rout  POST /api/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({ message: 'Sorry no account found!' });

  const isPassValid = await bcrypt.compare(password, teacher.user);

  if (!isPassValid)
    return res.status(400).json({ message: 'Invalid Credentials' });

  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.cookie('userToken', token, {
    httpOnly: true,
    signed: true,
    maxAge: 900000,
  });
  res.status(200).json({ email: user.email, name: user.name, role: user.role });
});

// @desc    Get users
// @rout    GET /api/users
export const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: true, users });
  } catch (error) {
    next(error);
  }
});

// @desc Get user by id
// @rout    GET /api/users/:id
export const getUserById = asyncHandler(async (req, res, next) => {
  try {
    if (!req.params.id || req.params.id === '') {
      return res.status(400).send('user ID is missing or invalid');
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
});
