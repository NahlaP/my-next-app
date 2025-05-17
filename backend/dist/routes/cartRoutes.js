"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.verifyToken, cartController_1.getUserCart);
router.post('/add', authMiddleware_1.verifyToken, cartController_1.addToCart);
router.patch('/:id', authMiddleware_1.verifyToken, cartController_1.updateCartItem);
router.delete('/clear', authMiddleware_1.verifyToken, cartController_1.clearUserCart);
router.delete('/:id', authMiddleware_1.verifyToken, cartController_1.deleteCartItem);
exports.default = router;
