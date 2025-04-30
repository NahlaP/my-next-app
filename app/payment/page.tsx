"use client";

import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
  
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      <h1 className="text-4xl font-extrabold text-green-600 mb-6 animate-bounce">
        Payment Successful! 🎉
      </h1>
      <p className="text-gray-700 text-lg text-center mb-4">
        Thank you for your purchase. Your order has been confirmed!
      </p>

      <button 
        onClick={() => window.location.href = '/'} 
        className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition"
      >
        Continue Shopping
      </button>
    </div>
  );
}
