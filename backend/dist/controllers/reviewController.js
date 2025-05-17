"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.getReviewsByProduct = exports.submitReview = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Review_1 = __importDefault(require("../models/Review"));
const Product_1 = __importDefault(require("../models/Product"));
const sentimentService_1 = require("../services/sentimentService");
const submitReview = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
            return;
        }
        const decoded = req.user;
        const userId = decoded._id || decoded.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized: Missing user ID in token' });
            return;
        }
        const { productId, rating, comment } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            res.status(400).json({ success: false, message: 'Invalid product ID' });
            return;
        }
        const existingReview = await Review_1.default.findOne({ user: userId, product: productId });
        if (existingReview) {
            res.status(400).json({ success: false, message: 'You have already reviewed this product' });
            return;
        }
        const sentiment = await (0, sentimentService_1.getSentiment)(comment);
        console.log('Sentiment:', sentiment);
        if ((sentiment === 'NEGATIVE' && rating >= 4) || (sentiment === 'POSITIVE' && rating <= 2)) {
            res.status(400).json({
                success: false,
                message: `Your ${sentiment.toLowerCase()} comment doesn't match your ${rating}-star rating.`,
            });
            return;
        }
        const review = await Review_1.default.create({
            user: userId,
            product: productId,
            rating,
            comment,
            sentiment,
        });
        console.log('Review Created:', review);
        const reviews = await Review_1.default.find({ product: productId });
        const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
        await Product_1.default.findByIdAndUpdate(productId, {
            rating: avgRating,
            numReviews: reviews.length,
        });
        res.status(201).json({ success: true, review });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error in submitReview:', err.message, err.stack);
        }
        else {
            console.error('Error in submitReview:', err);
        }
        res.status(500).json({ success: false, message: 'Failed to submit review' });
    }
};
exports.submitReview = submitReview;
const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            res.status(400).json({ success: false, message: 'Invalid product ID' });
            return;
        }
        const reviews = await Review_1.default.find({ product: productId }).populate('user', 'name email');
        res.status(200).json({ success: true, reviews });
    }
    catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
    }
};
exports.getReviewsByProduct = getReviewsByProduct;
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ success: false, message: 'Invalid review ID' });
            return;
        }
        const review = await Review_1.default.findById(id);
        if (!review) {
            res.status(404).json({ success: false, message: 'Review not found' });
            return;
        }
        const userId = req.user._id;
        const isAdmin = req.user.role === 'admin';
        if (review.user.toString() !== userId && !isAdmin) {
            res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
            return;
        }
        await review.deleteOne();
        res.status(200).json({ success: true, message: 'Review deleted' });
    }
    catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ success: false, message: 'Failed to delete review' });
    }
};
exports.deleteReview = deleteReview;
