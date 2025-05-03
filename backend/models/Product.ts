
// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     slug: { type: String, unique: true, required: true },
//     category: { type: String, required: true },
//     description: { type: String, required: true },
//     images: [{ type: String, required: true }], // ✅ Use "images" instead of "image"
//     price: { type: Number, required: true },
//     brand: { type: String, required: true },
//     rating: { type: Number, required: true },
//     numReviews: { type: Number, required: true },
//     stock: { type: Number, required: true },
//     isFeatured: { type: Boolean, default: false },
//     banner: { type: String, default: null },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
// export default Product;
import mongoose from 'mongoose';

// Define the schema for the Product model
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }], // Images as an array of strings
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

// Automatically generate a slug before saving if it's not already set
productSchema.pre('save', function (next) {
  if (!this.slug) {
    // Create a slug from the name, replacing spaces with hyphens and converting to lowercase
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

// Define the Product model
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
