


import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import Review from '../models/Review';
import Product from '../models/Product';
import { getSentiment } from '../services/sentimentService';

export const submitReview = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
      return;
    }

 
    const decoded = req.user as JwtPayload & { _id?: string; id?: string };
    const userId = decoded._id || decoded.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized: Missing user ID in token' });
      return;
    }

    const { productId, rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ success: false, message: 'Invalid product ID' });
      return;
    }

    const existingReview = await Review.findOne({ user: userId, product: productId });
    if (existingReview) {
      res.status(400).json({ success: false, message: 'You have already reviewed this product' });
      return;
    }

    const sentiment = await getSentiment(comment);
    console.log('Sentiment:', sentiment);

    if ((sentiment === 'NEGATIVE' && rating >= 4) || (sentiment === 'POSITIVE' && rating <= 2)) {
      res.status(400).json({
        success: false,
        message: `Your ${sentiment.toLowerCase()} comment doesn't match your ${rating}-star rating.`,
      });
      return;
    }

    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
      sentiment,
    });

    console.log('Review Created:', review);

    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: avgRating,
      numReviews: reviews.length,
    });

    res.status(201).json({ success: true, review });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error in submitReview:', err.message, err.stack);
    } else {
      console.error('Error in submitReview:', err);
    }
    res.status(500).json({ success: false, message: 'Failed to submit review' });
  }
};


export const getReviewsByProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ success: false, message: 'Invalid product ID' });
      return;
    }

    const reviews = await Review.find({ product: productId }).populate('user', 'name email');

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
};
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid review ID' });
      return;
    }

    const review = await Review.findById(id);
    if (!review) {
      res.status(404).json({ success: false, message: 'Review not found' });
      return;
    }

    const userId = (req.user as JwtPayload & { _id: string })._id;
    const isAdmin = (req.user as JwtPayload & { role?: string }).role === 'admin';

    if (review.user.toString() !== userId && !isAdmin) {
      res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
      return;
    }

    await review.deleteOne();
    res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ success: false, message: 'Failed to delete review' });
  }
};









