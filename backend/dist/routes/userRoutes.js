"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.get('/profile', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        const userId = req.user?.id;
        const user = await User_1.default.findById(userId).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch profile', error: err });
    }
});
exports.default = router;
