
// "use client";

// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { RootState } from "@/app/store";
// import Image from "next/image";
// import Link from "next/link"; 
// import { toast } from "sonner";
// import { addToCart } from "@/app/store/cartSlice";
// import { Product } from "@/app/store/product";
// import axios from "axios";

// const Page = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [products, setProducts] = useState<Product[]>([]);

//   const user = useSelector((state: RootState) => state.auth.user);
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

//   useEffect(() => {
//     if (!user) {
//       router.replace("/login");
//     }
//   }, [user, router]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/products"); 
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Failed to fetch products", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (!user) return null;

//   const handleAddToCart = (product: Product) => {
//     if (!isAuthenticated) {
//       toast.error("Please log in to add items to your cart.");
//       router.push("/login");
//       return;
//     }

//     // dispatch(addToCart({ ...product, quantity: 1 }));
// if (!product._id) {
//   toast.error("Product ID is missing. Cannot add to cart.");
//   return;
// }
// dispatch(addToCart({
//   ...product,
//   quantity: 1,
//   _id: product._id,          // use product's _id as cart item's _id
//   productId: product._id,    // assign product._id as productId too
// }));

//     toast.success(`${product.name} added to cart! 🛒`);
//     router.push("/cart");
//   };

//   return (
//     <main className="p-8 -mt-4">
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
//         {products.map((product) => (
//           <div key={product._id}>
//             <div className="relative w-full h-[300px] mb-4">
//               <Image
//                 src={product.images[0]}
//                 alt={product.name}
//                 fill
//                 className="object-contain rounded"
//                 sizes="(max-width: 768px) 100vw, 33vw"
//               />
//             </div>

//             <Link href={`/productCard/${product.slug}`}>
//               <h2 className="text-lg font-semibold text-center text-black hover:underline cursor-pointer">
//                 {product.name}
//               </h2>
//             </Link>

//             <p className="text-gray-500 text-center">{product.brand}</p>
//             <p className="text-gray-800 font-bold mt-2 text-center">${product.price}</p>

//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
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

// export default Page;



"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { RootState } from "@/app/store";
import { Product } from "@/app/store/product";

const HomePage = () => {
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
        throw new Error(errorData.message || "Failed to add to cart");
      }

      toast.success(`${product.name} added to cart! 🛒`);
      router.push("/cart");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error adding product to cart: ${error.message}`);
      } else {
        toast.error("Error adding product to cart: Unknown error");
      }
    }
  };

  return (
    <main className="p-8 -mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-2xl shadow-md">
            <div className="relative w-full h-[300px] mb-4">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <Link href={`/productCard/${product.slug}`}>
              <h2 className="text-lg font-semibold text-center hover:underline cursor-pointer">
                {product.name}
              </h2>
            </Link>

            <p className="text-gray-500 text-center">{product.brand}</p>
            <p className="text-gray-800 font-bold mt-2 text-center">${product.price}</p>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
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

export default HomePage;
