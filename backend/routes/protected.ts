import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';  

const router = express.Router();

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Protected route accessed', user: req.user });
});

export default router;
