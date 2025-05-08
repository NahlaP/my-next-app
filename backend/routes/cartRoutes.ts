// import express from 'express';
// import {
//   getCart,
//   addToCart,
//   removeFromCart
// } from '../controllers/cartController';
// import { verifyToken } from '../middleware/authMiddleware';

// const router = express.Router();

// router.get('/', verifyToken, getCart);
// router.post('/add', verifyToken, addToCart); // ✅ protect this
// router.delete('/remove', verifyToken, removeFromCart);

// export default router;
import express from 'express';
import {
    getUserCart,
  addToCart,
  updateCartItem,
  deleteCartItem
} from '../controllers/cartController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', verifyToken,getUserCart);
router.post('/add', verifyToken, addToCart); 
router.patch('/:id',verifyToken , updateCartItem);
router.delete("/:id", verifyToken, deleteCartItem); // NOT `/cart/:id`


export default router;
