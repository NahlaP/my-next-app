"use strict";
// import express from 'express';
// import {
//   getAllOrders,
//   getOrderById,
//   updateOrderStatus,
//   deleteOrder,
// } from '../controllers/adminOrderController';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const adminOrderController_1 = require("../controllers/adminOrderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const isAdmin_1 = require("../middleware/isAdmin");
const router = express_1.default.Router();
// Protect all admin order routes
router.use(authMiddleware_1.verifyToken, isAdmin_1.isAdmin);
router.get('/', adminOrderController_1.getAllOrders);
router.get('/:id', adminOrderController_1.getOrderById);
router.put('/:id', adminOrderController_1.updateOrderStatus);
router.delete('/:id', adminOrderController_1.deleteOrder);
exports.default = router;
