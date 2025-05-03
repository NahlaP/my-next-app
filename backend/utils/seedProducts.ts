import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';
import { sampleProducts } from '../data/sampleData';


dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error('❌ MONGO_URI is not defined in .env file');
}

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany();
    console.log('🧹 Existing products deleted');

    await Product.insertMany(sampleProducts);
    console.log(`✅ ${sampleProducts.length} products seeded`);

    process.exit();
  } catch (error) {
    console.error('❌ Seeding products failed:', error);
    process.exit(1);
  }
};

seedProducts();
