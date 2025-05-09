"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface OrderItem {
  slug: string;
  name: string;
  price: number;
  brand: string;
  images: string[];
  quantity: number;
}

interface Order {
  _id: string;
  name: string;
  address: string;
  cardNumber: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
}

export default function OrderSummaryPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to view your order.");
          router.push("/login"); // Redirect to login if no token
          return;
        }

        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrder(response.data.order);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Error fetching order. Please try again.");
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-xl">Loading your order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-xl">No order found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Order Summary</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Customer Details</h2>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Card Number:</strong> **** **** **** {order.cardNumber.slice(-4)}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Items</h2>
          <ul className="space-y-4">
            {order.items.map((item) => (
              <li key={item.slug} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>{item.brand}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{item.quantity} x ${item.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="text-lg font-semibold">Total Amount:</p>
          <p className="text-xl font-bold">${order.totalAmount}</p>
        </div>
      </div>
    </div>
  );
}
