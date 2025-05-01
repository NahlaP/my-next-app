"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.verifyToken, productController_1.createProduct);
router.get('/', authMiddleware_1.verifyToken, productController_1.getProducts);
router.get('/:slug', authMiddleware_1.verifyToken, productController_1.getProductBySlug);
router.put('/:id', authMiddleware_1.verifyToken, productController_1.updateProduct);
router.delete('/:id', authMiddleware_1.verifyToken, productController_1.deleteProduct);
exports.default = router;
