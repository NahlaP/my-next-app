"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Product_1 = __importDefault(require("../models/Product"));
const sampleData_1 = require("../data/sampleData");
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error('❌ MONGO_URI is not defined in .env file');
}
const seedProducts = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');
        await Product_1.default.deleteMany();
        console.log('🧹 Existing products deleted');
        await Product_1.default.insertMany(sampleData_1.sampleProducts);
        console.log(`✅ ${sampleData_1.sampleProducts.length} products seeded`);
        process.exit();
    }
    catch (error) {
        console.error('❌ Seeding products failed:', error);
        process.exit(1);
    }
};
seedProducts();
