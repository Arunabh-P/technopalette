import express from 'express';
import {
  getUserById,
  getUsers,
  loginUser,
  registerUser,
} from '../controllers/userController.js';
import { isAdmin } from '../middleware.js/authMiddleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/users', isAdmin, getUsers);
router.get('/users/:id', isAdmin, getUserById);

export default router;
