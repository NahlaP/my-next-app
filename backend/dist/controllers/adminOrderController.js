"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderStatus = exports.getOrderById = exports.getAllOrders = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order_1.default.find().populate('user', 'name email');
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error });
    }
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (req, res) => {
    try {
        const order = await Order_1.default.findById(req.params.id).populate('user', 'name email');
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch order', error });
    }
};
exports.getOrderById = getOrderById;
const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus, paymentStatus } = req.body;
        const order = await Order_1.default.findById(req.params.id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        if (orderStatus)
            order.set({ orderStatus });
        if (paymentStatus)
            order.set({ paymentStatus });
        await order.save();
        res.status(200).json({ message: 'Order updated successfully', order });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update order', error });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const deleteOrder = async (req, res) => {
    try {
        const order = await Order_1.default.findByIdAndDelete(req.params.id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete order', error });
    }
};
exports.deleteOrder = deleteOrder;
