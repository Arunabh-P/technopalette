import express from 'express';
import {
  getUserById,
  getUsers,
  loginUser,
  registerUser,
  logoutUser,
  updateProfile,
  loginAdmin,
} from '../controllers/userController.js';
import multer from 'multer';
import { isAdmin, isUser } from '../middleware.js/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('photo');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.put('/profileUpdate', upload, updateProfile);

router.get('/users', isAdmin, getUsers);
router.get('/users/:id', isAdmin, getUserById);

router.post('/admin', loginAdmin);

export default router;
