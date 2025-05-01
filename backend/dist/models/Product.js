"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String },
    description: { type: String },
    images: [String],
    price: { type: Number, required: true },
    brand: { type: String },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Product', productSchema);
