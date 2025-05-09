
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
// import orderRouter from './routes/orderRoutes'; // ✅ FIXED: import order routes
// import { verifyToken } from './middleware/authMiddleware';

// const app = express(); 
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use((req, res, next) => {
//   if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
//     express.json()(req, res, next);
//   } else {
//     next();
//   }
// });

// // Public routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/banners', bannerRoutes);

// // Protected routes
// app.use('/api/users', verifyToken, userRoutes);
// app.use('/api/cart', verifyToken, cartRoutes);
// app.use('/api/orders', verifyToken, orderRouter); // ✅ Apply middleware here or inside router file

// // MongoDB connection
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
import orderRouter from './routes/orderRoutes';
import { verifyToken } from './middleware/authMiddleware';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // Adjust to your frontend origin
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json()); // ✅ Apply JSON middleware globally

// ✅ Public routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/banners', bannerRoutes);

// ✅ Protected routes (require auth)
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/cart', verifyToken, cartRoutes);
app.use('/api/orders', verifyToken, orderRouter); // ✅ Order route

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
