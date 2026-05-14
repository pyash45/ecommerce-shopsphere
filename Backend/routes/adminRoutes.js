import express from 'express';

import {
  getDashboardStats,
  getRecentOrders,
  getTopProducts,
  getSalesChart
} from '../controllers/adminController.js';

import {
  protect
} from '../middleware/authMiddleware.js';

import adminOnly from '../middleware/adminMiddleware.js';

const router =
  express.Router();

router.get(
  '/stats',
  protect,
  adminOnly,
  getDashboardStats
);

router.get(
  '/recent-orders',
  protect,
  adminOnly,
  getRecentOrders
);

router.get(
  '/top-products',
  protect,
  adminOnly,
  getTopProducts
);

router.get(
  '/sales-chart',
  protect,
  adminOnly,
  getSalesChart
);

export default router;