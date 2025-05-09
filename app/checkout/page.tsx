
"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; 

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    toast.success(`Thank you, ${name}! Your order is placed successfully. 🛍️`);

    setTimeout(() => {
      router.push('/payment');
    }, 1500); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold mb-2">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

        
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-semibold mb-2">Shipping Address</label>
            <input
              id="address"
              type="text"
              placeholder="Enter your shipping address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

     
          <div className="flex flex-col">
            <label htmlFor="cardNumber" className="text-sm font-semibold mb-2">Card Number</label>
            <input
              id="cardNumber"
              type="password" 
              placeholder="•••• •••• •••• ••••"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
              maxLength={16}
            />
          </div>

        
          <button
            type="submit"
            className={`bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
}




