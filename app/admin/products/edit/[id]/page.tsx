
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";



const EditProduct = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string; 

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const product = res.data;
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
      } catch {
        toast.error("Failed to load product");
        router.push("/admin/products");
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        name,
        price,
        stock,
      });
      toast.success("Product updated");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to update product");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-8 space-y-4 max-w-md">
      <h2 className="text-xl font-bold mb-2">Edit Product</h2>
   
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Product
      </button>
   </form>
  );
};

export default EditProduct;
