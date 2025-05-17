





"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [images, setImages] = useState<FileList | null>(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [numReviews, setNumReviews] = useState<number>(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!images || images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("category", category);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("rating", rating.toString());
    formData.append("numReviews", numReviews.toString());

    Array.from(images).forEach((img) => {
      formData.append("images", img);
    });

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product added");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Add New Product</h2>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Product Name</label>
          <input
            type="text"
            placeholder="e.g. Cotton T-shirt"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Price (USD)</label>
          <input
            type="number"
            placeholder="e.g. 49.99"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Stock Quantity</label>
          <input
            type="number"
            placeholder="e.g. 20"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
          <input
            type="text"
            placeholder="e.g. Clothing"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
          <textarea
            placeholder="Write a brief description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Brand</label>
          <input
            type="text"
            placeholder="e.g. Nike"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Rating</label>
          <input
            type="number"
            step="0.1"
            placeholder="e.g. 4.5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Number of Reviews</label>
          <input
            type="number"
            placeholder="e.g. 10"
            value={numReviews}
            onChange={(e) => setNumReviews(Number(e.target.value))}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
