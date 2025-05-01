import express from 'express';

import { verifyToken } from '../middleware/authMiddleware';


import {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const router = express.Router();

router.post('/',verifyToken, createProduct);
router.get('/',verifyToken, getProducts);
router.get('/:slug',verifyToken, getProductBySlug);
router.put('/:id',verifyToken, updateProduct);
router.delete('/:id',verifyToken, deleteProduct);

export default router;
