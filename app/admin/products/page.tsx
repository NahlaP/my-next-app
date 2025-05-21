
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch {
      toast.error("Failed to load products");
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      toast.success("Product deleted");
      fetchProducts(); 
    } catch {
      toast.error("Error deleting product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Link
          href="/admin/products/create"
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-md transition-colors"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product._id}
              className="bg-white shadow-sm rounded-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="text-gray-800 mb-3 sm:mb-0">
                <span className="font-semibold">{product.name}</span> — ${product.price} — Stock: {product.stock}
              </div>
              <div className="flex gap-3">
                <a
                  href={`/admin/products/edit/${product._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Edit
                </a>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminProducts;

