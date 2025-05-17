
import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
  sentiment?: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    sentiment: {
      type: String,
      enum: ['POSITIVE', 'NEGATIVE', 'NEUTRAL'],
      default: 'NEUTRAL', 
    },
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>('Review', reviewSchema);
export default Review;
