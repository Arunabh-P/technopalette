import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
// @desc  Register user
// @rout  POST /api/register

cloudinary.config({
  cloud_name: 'dku0lexry',
  api_key: '428733244851567',
  api_secret: 'hoFHAxApJxeMKbjdtrjx5srUyjQ',
});

export const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ name, email, phone, password: hashedPassword });

      let photo =
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg';

      const myCloud = await cloudinary.v2.uploader.upload(photo, {
        folder: 'technopalette',
      });
      user.photo.public_id = myCloud.public_id;
      user.photo.url = myCloud.secure_url;

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

  if (user.role !== 'user') {
    return res.status(404).json({ message: 'you cant access here!' });
  }

  const isPassValid = await bcrypt.compare(password, user.password);

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
  res.status(200).json({ user });
});

// @desc  login admin
// @rout  POST /api/admin
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({ message: 'Sorry no account found!' });

  if (user.role !== 'admin') {
    return res.status(404).json({ message: 'you cant access here!' });
  }

  const isPassValid = await bcrypt.compare(password, user.password);

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
  res.status(200).json({ user });
});

// @desc  Logout
// @rout  GET /api/logout
export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).clearCookie('userToken').send({});
});

// @desc  UpdateUser
// @rout  PUT /api/users/:id
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      height,
      weight,
      residence,
      familyInfo,
      userId,
    } = req.body;
    const user = await User.findById(userId);

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }
    if (phone) {
      user.phone = phone;
    }
    console.log(req.files, 'here file');

    if (req.files && user.photo !== '') {
      await cloudinary.v2.uploader.destroy(user.photo.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'technopalette',
      });
      user.photo.public_id = myCloud.public_id;
      user.photo.url = myCloud.secure_url;

      // Delete the uploaded file from the server
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
    if (weight) {
      user.weight = weight;
    }
    if (height) {
      user.height = height;
    }
    if (residence) {
      user.residence = residence;
    }
    if (familyInfo) {
      user.familyInfo = familyInfo;
    }
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
