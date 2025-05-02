"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

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
      fetchProducts(); // Refresh list
    } catch {
      toast.error("Error deleting product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>
      <a href="/admin/products/create" className="bg-green-500 text-white px-4 py-2 rounded">+ Add Product</a>
      <ul className="mt-6 space-y-2">
        {products.map((product) => (
          <li key={product._id} className="flex justify-between bg-gray-100 p-4 rounded">
            <span>{product.name} - ${product.price} - Stock: {product.stock}</span>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => deleteProduct(product._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;
