
// import express from 'express';
// import { submitReview} from '../controllers/reviewController';
// import { verifyToken } from '../middleware/authMiddleware';

// const router = express.Router();

// // Submit a review (protected)
// router.post('/submit', verifyToken, submitReview);


// export default router;


import express from 'express';
import { submitReview,getReviewsByProduct,
  deleteReview} from '../controllers/reviewController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// Submit a review (protected)
router.post('/submit', verifyToken, submitReview);
router.get('/:productId', getReviewsByProduct); // public
router.delete('/:id', verifyToken, deleteReview); // protected


export default router;
