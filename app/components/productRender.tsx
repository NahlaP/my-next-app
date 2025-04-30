
// 'use client';

// import { toast } from 'sonner';
// import { useDispatch } from 'react-redux'; 
// import { addToCart } from "../store/cartSlice";
// import { Product } from '../store/product';

// import React from 'react';
// import Image from 'next/image';
// import Link from "next/link"; 
// import ProductList from './productList';
// import { useRouter } from 'next/navigation';

// const ProductsRender = () => {
//   const dispatch = useDispatch();
//   const router = useRouter(); 

//   const handleAddToCart = (product: Product) => {
//     dispatch(addToCart({ ...product, quantity: 1 }));
//     toast.success(`${product.name} added to cart! 🛒`);
//     router.push('/cart'); 
//   };

//   return (
//     // <main className="p-6 md:p-8 ">
//      <main className="bg-gray-200 p-6 md:p-8 mt-0"> 

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
//         {ProductList.products.map((product) => (
//           <div
//             key={product.slug}
//             className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
//           >
//             {/* Image with fixed height */}
//             <div className="relative w-full h-64 mb-4">
//               <Image
//                 src={product.images[0]}
//                 alt={product.name}
//                 fill
//                 className="object-contain rounded-lg"
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//               />
//             </div>

//             {/* Product name */}
//             <Link href={`/productCard/${product.slug}`}>
//               <h2 className="text-lg font-semibold text-center text-black hover:underline cursor-pointer">
//                 {product.name}
//               </h2>
//             </Link>

//             {/* Brand and price */}
//             <p className="text-gray-500 text-center">{product.brand}</p>
//             <p className="text-gray-800 font-bold mt-2 text-center">${product.price}</p>

//             {/* Add to Cart button */}
//             <div className="mt-4">
//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// };

// export default ProductsRender;
"use client";

import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../store/cartSlice";
import { Product } from '../store/product';
import { RootState } from '../store/store';

import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import ProductList from './productList';
import { useRouter } from 'next/navigation';

const ProductsRender = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your cart.");
      router.push("/login");
      return;
    }

    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} added to cart! 🛒`);
    router.push('/cart');
  };

  return (
    <main className="bg-gray-200 p-6 md:p-8 mt-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {ProductList.products.map((product) => (
          <div key={product.slug} className="bg-white p-4 rounded-2xl shadow-md">
            <div className="relative w-full h-64 mb-4">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain rounded-lg"
              />
            </div>

            <Link href={`/productCard/${product.slug}`}>
              <h2 className="text-lg font-semibold text-center hover:underline">{product.name}</h2>
            </Link>

            <p className="text-gray-500 text-center">{product.brand}</p>
            <p className="text-gray-800 font-bold mt-2 text-center">${product.price}</p>

            <div className="mt-4 text-center">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductsRender;
