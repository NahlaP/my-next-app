"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Order.ts
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fullName: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    cardNumber: String,
    expirationDate: String,
    cvv: String,
    cartItems: [
        {
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Product",
            },
            name: String,
            quantity: Number,
            price: Number,
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.models.Order || mongoose_1.default.model("Order", OrderSchema);
