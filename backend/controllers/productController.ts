import { RequestHandler } from 'express';
import Product from '../models/Product';

export const createProduct: RequestHandler = async (req, res): Promise<void> => {
  try {
    const product = new Product(req.body);
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
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err });
  }
};

export const updateProduct: RequestHandler = async (req, res): Promise<void> => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    res.json(updated);
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
