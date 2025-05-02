import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';
// Update this path to match the actual file location
import { sampleProducts } from '../data/sampleData';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in environment variables.');
}

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany(); // Clear existing products
    console.log('🧹 Old products removed');

    await Product.insertMany(sampleProducts);
    console.log(`✅ ${sampleProducts.length} products seeded successfully`);

    process.exit();
  } catch (err) {
    console.error('❌ Error seeding products:', err);
    process.exit(1);
  }
};

seedProducts();
