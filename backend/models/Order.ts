import mongoose, { Schema, Document } from 'mongoose';

// Defining the OrderItem type
interface OrderItem {
  slug: string;
  name: string;
  price: number;
  brand: string;
  images: string[];
  quantity: number;
}

// Order document interface
export interface OrderDocument extends Document {
  user: mongoose.Schema.Types.ObjectId; // Use ObjectId for the user reference
  name: string;
  address: string;
  cardNumber: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: Date;
}

// Order schema
const orderSchema = new Schema<OrderDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  cardNumber: { type: String, required: true },
  items: [
    {
      slug: String,
      name: String,
      price: Number,
      brand: String,
      images: [String],
      quantity: Number,
    }
  ],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create the model for the Order document
const Order = mongoose.model<OrderDocument>('Order', orderSchema);
export default Order;
