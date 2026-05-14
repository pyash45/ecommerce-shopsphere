import express from 'express';

import {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getRelatedProducts
} from '../controllers/productController.js';

import { protect } from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();


// PUBLIC ROUTES
router.get('/', getProducts);

router.get(
  '/related/:id',
  getRelatedProducts
);

router.get(
  '/:id',
  getSingleProduct
);


// USER ROUTES
router.post(
  '/:id/review',
  protect,
  addReview
);


// ADMIN ROUTES
router.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  createProduct
);

router.put(
  '/:id',
  protect,
  adminOnly,
  upload.single('image'),
  updateProduct
);

router.delete(
  '/:id',
  protect,
  adminOnly,
  deleteProduct
);

export default router;