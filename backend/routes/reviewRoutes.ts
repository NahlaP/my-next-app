
import express from 'express';
import { submitReview,getReviewsByProduct,
  deleteReview} from '../controllers/reviewController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();


router.post('/submit', verifyToken, submitReview);
router.get('/:productId', getReviewsByProduct);  
router.delete('/:id', verifyToken, deleteReview); 


export default router;
