"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const createOrder = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user.id) {
            res.status(401).json({ message: 'Unauthorized. Invalid or missing token.' });
            return;
        }
        const { fullName, email, phone, street, city, state, zipCode, cardNumber, expirationDate, cvv, cartItems, } = req.body;
        if (!cartItems || cartItems.length === 0) {
            res.status(400).json({ message: 'Cart is empty' });
            return;
        }
        const newOrder = await Order_1.default.create({
            user: user.id,
            fullName,
            email,
            phone,
            street,
            city,
            state,
            zipCode,
            cardNumber,
            expirationDate,
            cvv,
            cartItems,
        });
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    }
    catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ message: 'Failed to place order', error });
    }
};
exports.createOrder = createOrder;
const getUserOrders = async (req, res) => {
    try {
        const user = req.user;
        const orders = await Order_1.default.find({ user: user.id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};
exports.getUserOrders = getUserOrders;
