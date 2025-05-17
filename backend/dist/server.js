"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const bannerRoutes_1 = __importDefault(require("./routes/bannerRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const adminOrderRoutes_1 = __importDefault(require("./routes/adminOrderRoutes"));
const adminUserRoutes_1 = __importDefault(require("./routes/adminUserRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
app.use('/api/admin/orders', adminOrderRoutes_1.default);
app.use('/admin/users', adminUserRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/api/banners', bannerRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/reviews', reviewRoutes_1.default);
app.use('/api/cart', authMiddleware_1.verifyToken, cartRoutes_1.default);
app.use('/api/orders', authMiddleware_1.verifyToken, orderRoutes_1.default);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
    .catch((err) => console.error('❌ MongoDB connection error:', err));
