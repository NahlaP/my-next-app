// import express from 'express';
// import {
//   getAllOrders,
//   getOrderById,
//   updateOrderStatus,
//   deleteOrder,
// } from '../controllers/adminOrderController';

// import { verifyToken } from '../middleware/authMiddleware';
// import { isAdmin } from '../middleware/isAdmin';

// const router = express.Router();

// // Apply auth + admin middleware to all routes
// router.use(verifyToken, isAdmin);

// // GET /admin/orders
// router.get('/', getAllOrders);

// // GET /admin/orders/:id
// router.get('/:id', getOrderById);

// // PUT /admin/orders/:id
// router.put('/:id', updateOrderStatus);

// // DELETE /admin/orders/:id
// router.delete('/:id', deleteOrder);

// export default router;

// routes/adminOrderRoutes.ts
import express from 'express';
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/adminOrderController';
import { verifyToken } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/isAdmin';

const router = express.Router();

// Protect all admin order routes
router.use(verifyToken, isAdmin);

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;
