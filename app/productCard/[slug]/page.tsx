
// "use client";

// import { toast } from 'sonner';
// import { useParams, useRouter } from "next/navigation";
// import ProductList from "@/app/components/productList";
// import Image from "next/image";
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from "@/app/store/cartSlice";
// import { RootState, AppDispatch } from "@/app/store/store";

// export default function ProductCard() {
//   const { slug } = useParams();
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();

//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const product = ProductList.products.find((p) => p.slug === slug);

//   if (!product) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         Product not found.
//       </div>
//     );
//   }

//   const handleAddToCart = () => {
//     const existingProduct = cartItems.find((item) => item.slug === product.slug);

//     dispatch(addToCart({ ...product, quantity: 1 }));

//     if (existingProduct) {
//       toast.success(`${product.name} quantity increased! 🔥`);
//     } else {
//       toast.success(
//         <div className="flex items-center gap-4">
//           {/* Product Image */}
//           <div className="relative w-16 h-16">
//             <Image
//               src={product.images[0]}
//               alt={product.name}
//               fill
//               className="object-contain rounded"
//             />
//           </div>

//           {/* Text and Button */}
//           <div className="flex flex-col">
//             <p className="font-semibold">{product.name} added to cart! 🛒</p>
//           </div>
//         </div>,
//         {
//           duration: 2000,
//         }
//       );
//     }

//     router.push("/cart");
//   };

//   return (
//     <div className="p-8">
//       <div className="flex flex-col md:flex-row gap-8 items-start">
//         <div className="relative w-full md:w-1/2 h-[550px]">
//           <Image
//             src={product.images[0]}
//             alt={product.name}
//             fill
//             className="object-contain rounded"
//             sizes="(max-width: 768px) 100vw, 50vw"
//           />
//         </div>

//         <div className="w-full md:w-1/2 flex flex-col justify-center">
//           <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
//           <p className="text-gray-600 mb-2">{product.brand}</p>
//           <p className="text-gray-800 text-xl font-bold mb-4">${product.price}</p>

//           <div className="flex justify-start">
//             <button
//               onClick={handleAddToCart}
//               className="bg-red-800 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow hover:shadow-lg transition duration-300"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { addToCart } from "@/app/store/cartSlice";
import { RootState, AppDispatch } from "@/app/store/store";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  brand: string;
  stock: number;
  category: string;
  rating: number;
  numReviews: number;
}

export default function ProductCard() {
  const { slug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetch(`http://localhost:5000/api/products/slug/${slug}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch(() => setProduct(null))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!product) {
    return <div className="p-6 text-red-500">Product not found.</div>;
  }

  const handleAddToCart = () => {
    const existingProduct = cartItems.find((item) => item.slug === product.slug);

    dispatch(addToCart({ ...product, quantity: 1 }));

    if (existingProduct) {
      toast.success(`${product.name} quantity increased! 🔥`);
    } else {
      toast.success(
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain rounded"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">{product.name} added to cart! 🛒</p>
          </div>
        </div>,
        { duration: 2000 }
      );
    }

    router.push("/cart");
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="relative w-full md:w-1/2 h-[550px]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain rounded"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-2">{product.brand}</p>
          <p className="text-gray-800 text-xl font-bold mb-4">${product.price}</p>
          <div className="text-gray-700 mb-2">Category: {product.category}</div>
          <div className="text-gray-700 mb-2">Rating: {product.rating} / 5 ({product.numReviews} reviews)</div>
          <div className="text-gray-700 mb-4">Stock: {product.stock}</div>

          <button
            onClick={handleAddToCart}
            className="bg-red-800 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
