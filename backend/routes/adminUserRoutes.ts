// routes/adminUserRoutes.ts
import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/adminUserController';

import { verifyToken } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/isAdmin';

const router = express.Router();

// Apply middleware to protect all admin user routes
router.use(verifyToken, isAdmin);

// GET /admin/users
router.get('/', getAllUsers);

// GET /admin/users/:id
router.get('/:id', getUserById);

// PUT /admin/users/:id
router.put('/:id', updateUser);

// DELETE /admin/users/:id
router.delete('/:id', deleteUser);

export default router;
