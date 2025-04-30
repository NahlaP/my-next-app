"use client";

import { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    // Example items, replace with dynamic data
    { id: 1, name: "Product 1", price: 20, quantity: 1 },
    { id: 2, name: "Product 2", price: 15, quantity: 2 },
  ]);

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold text-xl">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}