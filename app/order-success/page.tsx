
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { clearCart } from "../store/cartSlice";

// interface Order {
//   _id: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   cardNumber: string;
//   expirationDate: string;
// }

// export default function OrderSuccessPage() {
//   const [order, setOrder] = useState<Order | null>(null);
//   const router = useRouter();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchOrder = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         const res = await fetch("http://localhost:5000/api/orders", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         const latest = data[data.length - 1];
//         setOrder(latest);

//         // Clear cart after placing order
//         dispatch(clearCart());
//         localStorage.removeItem("cart"); // if you also store cart in localStorage
//       } catch (err) {
//         console.error("Failed to fetch order", err);
//       }
//     };

//     fetchOrder();
//   }, [dispatch]);

//   const handleGoHome = () => {
//     router.push("/");
//   };

//   return (
//     <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
//       <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Order Successful!</h1>

//       {order ? (
//         <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
//           <p className="text-lg font-semibold">Order ID: {order._id}</p>
//           <p>Name: {order.fullName}</p>
//           <p>Email: {order.email}</p>
//           <p>Address: {order.street}, {order.city}, {order.state} - {order.zipCode}</p>
//           <p>Phone: {order.phone}</p>

//           {/* Security: Do not show full card details */}
//           <p className="text-gray-500 mt-2 italic">Your payment was processed securely.</p>

//           <button
//             onClick={handleGoHome}
//             className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition"
//           >
//             Back to Home
//           </button>
//         </div>
//       ) : (
//         <p className="text-gray-600">Loading order details...</p>
//       )}
//     </div>
//   );
// }







"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCartOnServer } from "../store/cartActions";
import type { AppDispatch } from "../store"; // make sure the path is correct

interface Order {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  expirationDate: string;
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();

  // ✅ Properly typed dispatch to support async thunks
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const latest = data[data.length - 1];
        setOrder(latest);

        // ✅ Clear cart from server and local storage
        await dispatch(clearCartOnServer());
        localStorage.removeItem("cart");
      } catch (err) {
        console.error("Failed to fetch order", err);
      }
    };

    fetchOrder();
  }, [dispatch]);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Order Successful!</h1>

      {order ? (
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
          <p className="text-lg font-semibold">Order ID: {order._id}</p>
          <p>Name: {order.fullName}</p>
          <p>Email: {order.email}</p>
          <p>Address: {order.street}, {order.city}, {order.state} - {order.zipCode}</p>
          <p>Phone: {order.phone}</p>
          <p className="text-gray-500 mt-2 italic">Your payment was processed securely.</p>

          <button
            onClick={handleGoHome}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <p className="text-gray-600">Loading order details...</p>
      )}
    </div>
  );
}
