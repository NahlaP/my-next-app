
import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { upload } from '../utils/upload';

const router = express.Router();

router.post('/', upload.array('images', 5), createProduct);
router.get('/', getProducts);


router.get('/slug/:slug', getProductBySlug);

router.get('/:id', getProductById); 

router.put('/:id', upload.array('images', 5), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
