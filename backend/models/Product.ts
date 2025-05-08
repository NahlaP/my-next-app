
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    stock: { type: Number, required: true },
    isFeatured: { type: Boolean, default: false },
    banner: { type: String, default: null },
  },
  { timestamps: true }
);


productSchema.pre('save', function (next) {
  if (!this.slug) {

    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
