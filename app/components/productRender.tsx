
// "use client";

// import { toast } from 'sonner';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from "../store/cartSlice";
// import { Product } from '../store/product';
// import { RootState } from '../store/store';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from "next/link";
// import { useRouter } from 'next/navigation';

// const ProductsRender = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/products");
//         const data = await res.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Failed to fetch products", error);
//         toast.error("Unable to load products. Try again later.");
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleAddToCart = (product: Product) => {
//     if (!isAuthenticated) {
//       toast.error("Please log in to add items to your cart.");
//       router.push("/login");
//       return;
//     }

//     dispatch(addToCart({ ...product, quantity: 1 }));
//     toast.success(`${product.name} added to cart! 🛒`);
//     router.push('/cart');
//   };

//   return (
//     <main className="bg-gray-200 p-6 md:p-8 mt-0">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
//         {products.map((product) => (
//           <div key={product.slug} className="bg-white p-4 rounded-2xl shadow-md">
//             <div className="relative w-full h-64 mb-4">
//               <Image
//                 src={product.images[0]}
//                 alt={product.name}
//                 fill
//                 className="object-contain rounded-lg"
//               />
//             </div>

//             <Link href={`/productCard/${product.slug}`}>
//               <h2 className="text-lg font-semibold text-center hover:underline">{product.name}</h2>
//             </Link>

//             <p className="text-gray-500 text-center">{product.brand}</p>
//             <p className="text-gray-800 font-bold mt-2 text-center">${product.price}</p>

//             <div className="mt-4 text-center">
//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
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

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from "next/link";
import { toast } from 'sonner';

import { Product } from '../store/product';
import { RootState } from '../store/store';

const ProductsRender = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Unable to load products. Try again later.");
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    if (!isAuthenticated || !user?.token) {
      toast.error("Please log in to add items to your cart.");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          brand: product.brand,
          images: product.images,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Add to cart failed:", errorData);
        throw new Error(errorData.message || "Failed to add to cart");
      }

      toast.success(`${product.name} added to cart! 🛒`);
      router.push("/cart");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Add to cart error:", error);
        toast.error(`Error adding product to cart: ${error.message}`);
      } else {
        console.error("Add to cart error:", error);
        toast.error("Error adding product to cart: Unknown error");
      }
    }
  };

  return (
    <main className="bg-gray-200 p-6 md:p-8 mt-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
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
              <h2 className="text-lg font-semibold text-center hover:underline">
                {product.name}
              </h2>
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

