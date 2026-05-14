import express from 'express';
import {
  registerUser,
  loginUser,
  verifyOTP,
  getProfile,
  getMe,
updateProfile,
changePassword,
adminLogin
} from '../controllers/authController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.get('/me', protect, getMe);
router.post('/admin-login', adminLogin);

router.put(
  '/update-profile',
  protect,
  updateProfile
);

router.put(
  '/change-password',
  protect,
  changePassword
);

export default router;