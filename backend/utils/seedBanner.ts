// backend/seeder/seedBanners.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Banner from '../models/Banner';
import { sampleBanners } from '../data/sampleBanners';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in environment variables.');
}

const seedBanners = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Banner.deleteMany(); // Clear existing banners
    console.log('🧹 Old banners removed');

    await Banner.insertMany(sampleBanners);
    console.log(`✅ ${sampleBanners.length} banners seeded successfully`);

    process.exit();
  } catch (err) {
    console.error('❌ Error seeding banners:', err);
    process.exit(1);
  }
};

seedBanners();
