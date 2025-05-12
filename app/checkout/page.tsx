
// "use client";

// import { useState } from "react";
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner'; 

// export default function CheckoutPage() {
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     toast.success(`Thank you, ${name}! Your order is placed successfully. 🛍️`);

//     setTimeout(() => {
//       router.push('/payment');
//     }, 1500); 
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
//         <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      
//           <div className="flex flex-col">
//             <label htmlFor="name" className="text-sm font-semibold mb-2">Full Name</label>
//             <input
//               id="name"
//               type="text"
//               placeholder="Enter your full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
//               required
//             />
//           </div>

        
//           <div className="flex flex-col">
//             <label htmlFor="address" className="text-sm font-semibold mb-2">Shipping Address</label>
//             <input
//               id="address"
//               type="text"
//               placeholder="Enter your shipping address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
//               required
//             />
//           </div>

     
//           <div className="flex flex-col">
//             <label htmlFor="cardNumber" className="text-sm font-semibold mb-2">Card Number</label>
//             <input
//               id="cardNumber"
//               type="password" 
//               placeholder="•••• •••• •••• ••••"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//               className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
//               required
//               maxLength={16}
//             />
//           </div>

        
//           <button
//             type="submit"
//             className={`bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Processing...' : 'Pay Now'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }





"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Link from "next/link";
import { clearCart } from "../store/cartSlice";
import { RootState } from "../store"; // Adjust the import path to where your RootState is defined

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items); // Ensure RootState is correctly defined in your store

  const [address, setAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in address) {
      setAddress((prev) => ({ ...prev, [name]: value }));
    } else if (name in paymentDetails) {
      setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...address,
          ...paymentDetails,
          cartItems,
        }),
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      dispatch(clearCart()); // ✅ Clear Redux cart
      toast.success("Checkout successful!");
      router.push("/order-success");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to complete the checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Checkout</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-8">
        {/* Address Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Address</h2>
          <div className="space-y-6">
            {["fullName", "email", "phone", "street", "city", "state", "zipCode"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                value={address[field as keyof typeof address]}
                onChange={handleChange}
                className="w-full p-4 border rounded-lg shadow-md focus:outline-none"
                required
              />
            ))}
          </div>
        </div>

        {/* Payment Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Information</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg shadow-md focus:outline-none mb-4"
            required
          />
          <div className="flex space-x-4">
            <input
              type="text"
              name="expirationDate"
              placeholder="Expiration Date"
              value={paymentDetails.expirationDate}
              onChange={handleChange}
              className="w-1/2 p-4 border rounded-lg shadow-md focus:outline-none"
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={handleChange}
              className="w-1/2 p-4 border rounded-lg shadow-md focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Link href="/cart">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400 transition"
            >
              Go Back to Cart
            </button>
          </Link>
          <button
            type="submit"
            className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-500 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Complete Checkout"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
