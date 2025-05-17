
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

router.use(verifyToken, isAdmin);

router.get('/', getAllUsers);


router.get('/:id', getUserById);

router.put('/:id', updateUser);


router.delete('/:id', deleteUser);

export default router;
