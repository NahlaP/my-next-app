import express from 'express';
import { createOrder, getUserOrders} from '../controllers/orderController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', verifyToken, getUserOrders);
router.post('/', verifyToken, createOrder);

export default router;