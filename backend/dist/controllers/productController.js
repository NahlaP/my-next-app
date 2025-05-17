"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProductBySlug = exports.getProducts = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const createProduct = async (req, res) => {
    try {
        const { name, price, stock, description, category, slug, brand, rating, numReviews, isFeatured, banner, } = req.body;
        const images = Array.isArray(req.files) ? req.files.map((file) => file.path) : []; // Cloudinary URLs
        const product = new Product_1.default({
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
    }
    catch (err) {
        res.status(500).json({ message: 'Creation failed', error: err });
    }
};
exports.createProduct = createProduct;
const getProducts = async (_req, res) => {
    try {
        const products = await Product_1.default.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: 'Fetch failed', error: err });
    }
};
exports.getProducts = getProducts;
const getProductBySlug = async (req, res) => {
    try {
        console.log(`Received slug: ${req.params.slug}`); // ✅ Corrected line
        const product = await Product_1.default.findOne({ slug: req.params.slug });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ message: 'Fetch by slug failed', error: err });
    }
};
exports.getProductBySlug = getProductBySlug;
const getProductById = async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ message: 'Fetch by ID failed', error: err });
    }
};
exports.getProductById = getProductById;
const updateProduct = async (req, res) => {
    try {
        const { name, price, stock, description, category, slug, brand, rating, numReviews, isFeatured, banner, } = req.body;
        const images = Array.isArray(req.files) ? req.files.map((file) => file.path) : []; // Cloudinary URLs
        const updateData = {
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
            const existing = (await Product_1.default.findById(req.params.id))?.images || [];
            updateData.images = [...existing, ...images]; // Append new images
        }
        const updatedProduct = await Product_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(updatedProduct);
    }
    catch (err) {
        res.status(500).json({ message: 'Update failed', error: err });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: 'Not found' });
            return;
        }
        res.json({ message: 'Deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Deletion failed', error: err });
    }
};
exports.deleteProduct = deleteProduct;
