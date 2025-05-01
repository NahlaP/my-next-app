import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String },
  description: { type: String },
  images: [String],
  price: { type: Number, required: true },
  brand: { type: String },
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
