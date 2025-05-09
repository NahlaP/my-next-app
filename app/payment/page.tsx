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

// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Confetti from "react-confetti";

// export default function PaymentPage() {
//   const [showConfetti, setShowConfetti] = useState(true);
//   const searchParams = useSearchParams();

//   const name = searchParams.get("name");
//   const amount = searchParams.get("amount");

//   useEffect(() => {
//     const timer = setTimeout(() => setShowConfetti(false), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
//       {showConfetti && (
//         <Confetti width={window.innerWidth} height={window.innerHeight} />
//       )}

//       <h1 className="text-4xl font-extrabold text-green-600 mb-6 animate-bounce">
//         Payment Successful! 🎉
//       </h1>

//       <p className="text-gray-700 text-lg text-center mb-2">
//         Thank you, <span className="font-semibold">{name}</span>!
//       </p>
//       <p className="text-gray-700 text-lg text-center">
//         Your order of <span className="font-semibold">${amount}</span> has been confirmed.
//       </p>

//       <button
//         onClick={() => window.location.href = '/'}
//         className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition"
//       >
//         Continue Shopping
//       </button>
//     </div>
//   );
// }
