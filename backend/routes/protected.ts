import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';  // Updated path

const router = express.Router();

router.get('/dashboard', verifyToken, (req, res) => {
  // @ts-ignore
  res.json({ message: 'Protected route accessed', user: req.user });
});

export default router;
