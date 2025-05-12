



// models/CartItem.ts
import { Schema, model } from 'mongoose';

const CartItemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' }, // Optional
  name: { type: String, required: true },
  slug: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  brand: { type: String },
  images: [{ type: String }],
}, { timestamps: true });

export default model('CartItem', CartItemSchema);