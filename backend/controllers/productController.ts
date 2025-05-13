
import { RequestHandler, Request } from 'express';
import Product from '../models/Product';

interface MulterRequest extends Request {
  files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
}

export const createProduct: RequestHandler = async (req: MulterRequest, res): Promise<void> => {
  try {
    const {
      name,
      price,
      stock,
      description,
      category,
      slug,
      brand,
      rating,
      numReviews,
      isFeatured,
      banner,
    } = req.body;

    const images = Array.isArray(req.files) ? req.files.map((file) => file.path) : []; // Cloudinary URLs

    const product = new Product({
      name,
      price,
      stock,
      description,
      category,
      slug,
      brand,
      rating,
      numReviews,
      isFeatured,
      banner,
      images,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Creation failed', error: err });
  }
};

export const getProducts: RequestHandler = async (_req, res): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err });
  }
};
export const getProductBySlug: RequestHandler = async (req, res): Promise<void> => {
  try {
    console.log(`Received slug: ${req.params.slug}`); // ✅ Corrected line

    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Fetch by slug failed', error: err });
  }
};


export const getProductById: RequestHandler = async (req, res): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Fetch by ID failed', error: err });
  }
};


export const updateProduct: RequestHandler = async (req: MulterRequest, res): Promise<void> => {
  try {
    const {
      name,
      price,
      stock,
      description,
      category,
      slug,
      brand,
      rating,
      numReviews,
      isFeatured,
      banner,
    } = req.body;

    const images = Array.isArray(req.files) ? req.files.map((file) => file.path) : []; // Cloudinary URLs

    const updateData: Partial<{
      name: string;
      price: number;
      stock: number;
      description: string;
      category: string;
      slug: string;
      brand: string;
      rating: number;
      numReviews: number;
      isFeatured: boolean;
      banner: string;
      images: string[];
    }> = {
      name,
      price,
      stock,
      description,
      category,
      slug,
      brand,
      rating,
      numReviews,
      isFeatured,
      banner,
    };

    if (images && images.length > 0) {
      const existing = (await Product.findById(req.params.id))?.images || [];
      updateData.images = [...existing, ...images]; // Append new images
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err });
  }
};

export const deleteProduct: RequestHandler = async (req, res): Promise<void> => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed', error: err });
  }
};