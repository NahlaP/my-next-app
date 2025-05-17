"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Banner_1 = __importDefault(require("../models/Banner"));
const sampleBanners_1 = require("../data/sampleBanners");
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables.');
}
const seedBanners = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');
        await Banner_1.default.deleteMany();
        console.log('🧹 Old banners removed');
        await Banner_1.default.insertMany(sampleBanners_1.sampleBanners);
        console.log(`✅ ${sampleBanners_1.sampleBanners.length} banners seeded successfully`);
        process.exit();
    }
    catch (err) {
        console.error('❌ Error seeding banners:', err);
        process.exit(1);
    }
};
seedBanners();
