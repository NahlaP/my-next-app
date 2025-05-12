

// import express from 'express';
// import { verifyToken } from '../middleware/authMiddleware';
// import User from '../models/User';

// const router = express.Router();

// router.get('/profile', verifyToken, async (req: express.Request, res: express.Response): Promise<void> => {
//   try {
   
//     interface AuthenticatedRequest extends express.Request {
//       user?: { id: string };
//     }

//     const userId = (req as AuthenticatedRequest).user?.id; 
//     const user = await User.findById(userId).select('-password');

//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch profile', error: err });
//   }
// });

// export default router;
import express, { Request, Response } from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import User from '../models/User';

const router = express.Router();

router.get('/profile', verifyToken, async (req: Request, res: Response): Promise<void> => {
  try {
    interface AuthenticatedRequest extends Request {
      user?: { id: string };
    }

    const userId = (req as AuthenticatedRequest).user?.id;

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
