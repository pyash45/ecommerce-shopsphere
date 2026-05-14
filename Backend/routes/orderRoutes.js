import express from 'express';

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  createDirectOrder
} from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';
import  adminOnly  from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post(
  '/direct',
  protect,
  createDirectOrder
);
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);

router.get('/', protect, adminOnly, getAllOrders);
router.put('/:id', protect, adminOnly, updateOrderStatus);

export default router;