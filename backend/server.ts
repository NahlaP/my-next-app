

// import dotenv from 'dotenv';
// dotenv.config(); 

// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

// import authRoutes from './routes/authRoutes';
// import productRoutes from './routes/productRoutes';
// import userRoutes from './routes/userRoutes';
// import cartRoutes from './routes/cartRoutes';
// import bannerRoutes from './routes/bannerRoutes';
// import orderRouter from './routes/orderRoutes';
// import { verifyToken } from './middleware/authMiddleware';

// const app = express();
// const PORT = process.env.PORT || 5000;


// app.use(
//   cors({
//     origin: 'http://localhost:3000', 
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

// app.use(express.json()); 

// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/banners', bannerRoutes);

// app.use('/api/users', verifyToken, userRoutes);
// app.use('/api/cart', verifyToken, cartRoutes);
// app.use('/api/orders', verifyToken, orderRouter); 


// mongoose
//   .connect(process.env.MONGO_URI!)
//   .then(() => {
//     console.log('✅ MongoDB connected');
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error('❌ MongoDB connection error:', err));


import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import cartRoutes from './routes/cartRoutes';
import bannerRoutes from './routes/bannerRoutes';

// import checkoutRoutes from './routes/checkout'; // 👈 Add this line
import orderRoutes from './routes/orderRoutes';

import { verifyToken } from './middleware/authMiddleware';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/banners', bannerRoutes);

// ✅ Public access to /api/users/profile handled with verifyToken inside route
app.use('/api/users', userRoutes);

// ✅ Protected routes
app.use('/api/cart', verifyToken, cartRoutes);
app.use('/api/orders', verifyToken,orderRoutes );



// ✅ Database connection
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
