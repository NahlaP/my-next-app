
// import mongoose, { Schema, Document } from 'mongoose';

// export interface IReview extends Document {
//   user: mongoose.Schema.Types.ObjectId;
//   product: mongoose.Schema.Types.ObjectId;
//   rating: number;
//   comment: string;
// }

// const reviewSchema = new Schema<IReview>(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const Review = mongoose.model<IReview>('Review', reviewSchema);
// export default Review;


import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
  sentiment?: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'; // ✅ Optional AI field
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
      default: 'NEUTRAL', // ✅ Default in case AI fails
    },
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>('Review', reviewSchema);
export default Review;
