
"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "@/app/store/cartSlice";
import withAuth from "@/app/utils/withAuth";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your cart is empty 🛒</h2>
        <Link href="/">
          <button className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition">
            Go Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
        {cartItems.map((item) => (
          <div
            key={item.slug}
            className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-all"
          >
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 mb-6 md:mb-0 md:mr-8 flex-shrink-0">
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                className="object-contain rounded-lg"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full">
              <div className="flex flex-col mb-4 md:mb-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">{item.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{item.brand}</p>
                <p className="text-gray-900 font-semibold text-lg sm:text-xl">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-gray-500 text-sm">
                  (${item.price} × {item.quantity})
                </p>
              </div>

              <div className="flex flex-col md:items-end md:justify-between space-y-4 md:space-y-2">
                <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition"
                    onClick={() => dispatch(increaseQuantity(item.slug))}
                  >
                    +
                  </button>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition"
                    onClick={() => dispatch(decreaseQuantity(item.slug))}
                  >
                    -
                  </button>
                </div>

                <button
                  className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-500 mt-4 transition"
                  onClick={() => dispatch(removeFromCart(item.slug))}
                >
                  Remove
                </button>

                <Link href="/checkout">
                  <button className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg w-full max-w-xs mt-6 hover:bg-green-500 transition">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center">
        <p className="text-2xl font-semibold text-gray-800 mb-4">Ready to Checkout?</p>
        <Link href="/checkout">
          <button className="bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-green-500 transition">
            Go to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default withAuth(CartPage);
