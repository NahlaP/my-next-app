"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearUserCart = exports.deleteCartItem = exports.updateCartItem = exports.addToCart = exports.getUserCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const items = await Cart_1.default.find({ userId });
        res.json({ items });
    }
    catch {
        res.status(500).json({ message: 'Failed to fetch cart' });
    }
};
exports.getUserCart = getUserCart;
const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, slug, price, quantity, brand, images, productId } = req.body;
        const existingItem = await Cart_1.default.findOne({ userId, productId });
        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
        }
        else {
            await Cart_1.default.create({
                userId,
                productId,
                name,
                slug,
                price,
                quantity,
                brand,
                images,
            });
        }
        const items = await Cart_1.default.find({ userId });
        res.status(200).json({ items });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add to cart' });
    }
};
exports.addToCart = addToCart;
const updateCartItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const { action } = req.body;
        const cartItem = await Cart_1.default.findById(itemId);
        if (!cartItem) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }
        if (action === 'increase') {
            cartItem.quantity += 1;
        }
        else if (action === 'decrease') {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            }
            else {
                res.status(400).json({ message: 'Minimum quantity is 1' });
                return;
            }
        }
        else {
            res.status(400).json({ message: 'Invalid action. Use "increase" or "decrease".' });
            return;
        }
        await cartItem.save();
        const userId = req.user.id;
        const items = await Cart_1.default.find({ userId });
        res.status(200).json({ items });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update cart item' });
    }
};
exports.updateCartItem = updateCartItem;
const deleteCartItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        await Cart_1.default.findByIdAndDelete(itemId);
        const userId = req.user.id;
        const items = await Cart_1.default.find({ userId });
        res.status(200).json({ items });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete cart item' });
    }
};
exports.deleteCartItem = deleteCartItem;
const clearUserCart = async (req, res) => {
    try {
        const userId = req.user.id;
        await Cart_1.default.deleteMany({ userId });
        res.status(200).json({ items: [] });
    }
    catch (error) {
        console.error("Error in clearUserCart:", error);
        res.status(500).json({ message: "Failed to clear cart" });
    }
};
exports.clearUserCart = clearUserCart;
