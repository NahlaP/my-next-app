// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   slug: { type: String, required: true, unique: true },
//   category: { type: String },
//   description: { type: String },
//   images: [String],
//   price: { type: Number, required: true },
//   brand: { type: String },
//   rating: { type: Number, default: 0 },
//   stock: { type: Number, default: 0 },
//   isFeatured: { type: Boolean, default: false }
// }, { timestamps: true });

// export default mongoose.model('Product', productSchema);
import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  isFeatured: boolean;
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
