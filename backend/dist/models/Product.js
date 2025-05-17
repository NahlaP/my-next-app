"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    stock: { type: Number, required: true },
    isFeatured: { type: Boolean, default: false },
    banner: { type: String, default: null },
}, { timestamps: true });
productSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
    }
    next();
});
const Product = mongoose_1.default.models.Product || mongoose_1.default.model('Product', productSchema);
exports.default = Product;
