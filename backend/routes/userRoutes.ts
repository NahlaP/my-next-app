import express from 'express';

import { verifyToken } from '../middleware/authMiddleware';

import User from '../models/User';

const router = express.Router();

router.get('/profile', verifyToken, async (req, res): Promise<void> => {

  try {
    const userId = (req.user as any).id; // safely access user ID from JWT
    const user = await User.findById(userId).select('-password');

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
        
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err });
  }
});

export default router;
