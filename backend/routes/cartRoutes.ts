
import express from 'express';
import {
  getUserCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
    clearUserCart
} from '../controllers/cartController';

import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', verifyToken, getUserCart);
router.post('/add', verifyToken, addToCart);
router.patch('/:id', verifyToken, updateCartItem);

router.delete('/clear', verifyToken, clearUserCart);
router.delete('/:id', verifyToken, deleteCartItem);
export default router;
