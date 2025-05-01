"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/routes/authRoutes.ts
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@example.com' && password === 'adminpassword') {
        return res.status(200).json({
            token: 'fake-jwt-token',
            user: {
                name: 'Admin',
                email: 'admin@example.com',
                isAdmin: true,
            },
        });
    }
    else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});
router.post('/signUp', authController_1.signUp);
exports.default = router;
