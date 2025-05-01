import dotenv from 'dotenv';
dotenv.config(); // ✅ must come first





import express from 'express';
import mongoose from 'mongoose';

import cors from 'cors';
import protectedRoutes from './routes/protected';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', protectedRoutes);

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));