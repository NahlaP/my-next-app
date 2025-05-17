"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartItemSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }, // Optional
    name: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    brand: { type: String },
    images: [{ type: String }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('CartItem', CartItemSchema);
