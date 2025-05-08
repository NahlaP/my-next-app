// import dotenv from 'dotenv';
// dotenv.config(); // ✅ must come first



// import express from 'express';


// import mongoose from 'mongoose';


// import cors from 'cors';
// import protectedRoutes from './routes/protected';
// import authRoutes from './routes/authRoutes';
// import productRoutes from './routes/productRoutes';
// import userRoutes from './routes/userRoutes';
// import cartRoutes from './routes/cartRoutes';
// import bannerRoutes from './routes/bannerRoutes';


// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/api', protectedRoutes);
// app.use(cartRoutes); 
// app.use('/api/banners', bannerRoutes);
// // Routes
// app.use('/api/auth', authRoutes);

// app.use('/api/users', userRoutes);

// app.use('/api/products', productRoutes);
// mongoose
//   .connect(process.env.MONGO_URI!)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error('MongoDB connection error:', err));



// import dotenv from 'dotenv';
// dotenv.config(); // ✅ must come first

// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

// import authRoutes from './routes/authRoutes';
// import productRoutes from './routes/productRoutes';
// import userRoutes from './routes/userRoutes';
// import cartRoutes from './routes/cartRoutes';
// import bannerRoutes from './routes/bannerRoutes';
// import { verifyToken } from './middleware/authMiddleware'; // 👈 Add this

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Public routes (no token required)
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/banners', bannerRoutes);

// // Protected routes (require token)
// app.use('/api/users', verifyToken, userRoutes);
// app.use('/api/cart', verifyToken, cartRoutes);

// // Connect to MongoDB and start server
// mongoose
//   .connect(process.env.MONGO_URI!)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error('MongoDB connection error:', err));


import dotenv from 'dotenv';
dotenv.config(); // ✅ must come first

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import cartRoutes from './routes/cartRoutes';
import bannerRoutes from './routes/bannerRoutes';
import { verifyToken } from './middleware/authMiddleware'; // 👈 Add this

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    express.json()(req, res, next);
  } else {
    next();
  }
});


// Public routes (no token required)
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/banners', bannerRoutes);

// Protected routes (require token)
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/cart', verifyToken, cartRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
