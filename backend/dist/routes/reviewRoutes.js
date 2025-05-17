"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/submit', authMiddleware_1.verifyToken, reviewController_1.submitReview);
router.get('/:productId', reviewController_1.getReviewsByProduct);
router.delete('/:id', authMiddleware_1.verifyToken, reviewController_1.deleteReview);
exports.default = router;
