// import express from 'express';

// import { verifyToken } from '../middleware/authMiddleware';


// import {
//   createProduct,
//   getProducts,
//   getProductBySlug,
//   updateProduct,
//   deleteProduct
// } from '../controllers/productController';

// const router = express.Router();

// router.post('/',verifyToken, createProduct);
// router.get('/',verifyToken, getProducts);
// router.get('/:slug',verifyToken, getProductBySlug);
// router.put('/:id',verifyToken, updateProduct);
// router.delete('/:id',verifyToken, deleteProduct);

// export default router;
// backend/routes/productRoutes.ts
import express from 'express';
import Product from '../models/Product';

const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

export default router;
