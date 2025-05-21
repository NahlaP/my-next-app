"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  brand: string;
  stock: number;
  category: string;
  rating: number;
  numReviews: number;
}

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      axios
        .get(`http://localhost:5000/api/products/slug/${slug}`)
        .then((res) => setProduct(res.data))
        .catch(() => setProduct(null))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!product) return <p className="p-8 text-red-500">Product not found.</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {product.images.map((imgUrl, index) => (
          <div key={index} className="relative w-full h-64">
            <Image
              src={imgUrl}
              alt={`${product.name} image ${index + 1}`}
              fill
              className="object-contain rounded-md border"
            />
          </div>
        ))}
      </div>

      <div className="text-lg font-semibold">Price: ${product.price}</div>
      <div className="text-gray-700">Brand: {product.brand}</div>
      <div className="text-gray-700">Stock: {product.stock}</div>
      <div className="text-gray-700">Category: {product.category}</div>
      <div className="text-gray-700">
        Rating: {product.rating} / 5 ({product.numReviews} reviews)
      </div>
    </div>
  );
};

export default ProductDetail;









