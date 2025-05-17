



// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { toast } from "sonner";
// import {  useSelector } from "react-redux";
// import Image from "next/image";

// // import { addToCart } from "@/app/store/cartSlice";
// import { RootState } from "@/app/store/store";

// interface Product {
//   _id: string;
//   name: string;
//   slug: string;
//   description: string;
//   images: string[];
//   price: number;
//   brand: string;
//   stock: number;
//   category: string;
//   rating: number;
//   numReviews: number;
// }

// interface Review {
//   _id: string;
//   user: {
//     name: string;
//   };
//   rating: number;
//   comment: string;
//   sentiment?: string;
// }

// export default function ProductCard() {
//   const { slug } = useParams();
//   const router = useRouter();
//   // const dispatch = useDispatch<AppDispatch>();
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
//   const [product, setProduct] = useState<Product | null>(null);
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Review form state
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   // Check if the user is logged in
//   const isLoggedIn = !!localStorage.getItem("token");

//   useEffect(() => {
//     const fetchProductAndReviews = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const productRes = await fetch(`http://localhost:5000/api/products/slug/${slug}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const productData = await productRes.json();
//         setProduct(productData);

//         const reviewRes = await fetch(`http://localhost:5000/api/reviews/${productData._id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`, 
//           },
//         });
//         const reviewData = await reviewRes.json();
//         setReviews(Array.isArray(reviewData.reviews) ? reviewData.reviews : []);
//       } catch (err) {
//         console.error("Error loading product or reviews", err);
//         toast.error("Failed to load product or reviews.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (slug) fetchProductAndReviews();
//   }, [slug]);




//  const handleAddToCart = async (product: Product) => {
//     if (!isAuthenticated || !user?.token) {
//       toast.error("Please log in to add items to your cart.");
//       router.push("/login");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/cart/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({
//           productId: product._id,
//           name: product.name,
//           slug: product.slug,
//           price: product.price,
//           brand: product.brand,
//           images: product.images,
//           quantity: 1,
//         }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Failed to add to cart");
//       }

//       toast.success(`${product.name} added to cart! 🛒`);
//       router.push("/cart");
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         toast.error(`Error adding product to cart: ${error.message}`);
//       } else {
//         toast.error("Error adding product to cart: Unknown error");
//       }
//     }
//   };

//   const submitReview = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!comment.trim()) return toast.error("Comment cannot be empty");
//     if (!product) return;

//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch("http://localhost:5000/api/reviews/submit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, 
//         },
//         body: JSON.stringify({
//           productId: product._id,
//           rating,
//           comment,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to submit review");

//       const data = await res.json();
//       setComment("");
//       setRating(5);
//       setReviews((prev) => [data.review, ...prev]);
//       toast.success("Review submitted!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Error submitting review.");
//     }
//   };

//   if (loading) return <div className="p-6 text-center">Loading product details...</div>;
//   if (!product) return <div className="p-6 text-red-500">Product not found.</div>;

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
//           <div className="text-gray-700 mb-2">Category: {product.category}</div>
//           <div className="text-gray-700 mb-2">Rating: {product.rating} / 5 ({product.numReviews} reviews)</div>
//           <div className="text-gray-700 mb-4">Stock: {product.stock}</div>

//           <button
//             onClick={() => handleAddToCart(product)}
//             className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       {isLoggedIn && (
//         <div className="mt-12">
//           <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
//           ) : (
//             reviews.map((review) => (
//               <div key={review._id} className="mb-4 border-b pb-4">
//                 <div className="flex justify-between items-center">
//                   <p className="font-semibold">{review.user?.name || "Anonymous"}</p>
//                   {review.sentiment && (
//                     <span className={`text-xs px-2 py-1 rounded ${
//                       review.sentiment === 'POSITIVE'
//                         ? 'bg-green-100 text-green-700'
//                         : review.sentiment === 'NEGATIVE'
//                         ? 'bg-red-100 text-red-700'
//                         : 'bg-gray-100 text-gray-700'
//                     }`}>
//                       {review.sentiment}
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-yellow-600">
//                   {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
//                 </p>
//                 <p>{review.comment}</p>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {isLoggedIn && (
//         <div className="mt-12">
//           <h2 className="text-xl font-bold mb-4">Write a Review</h2>
//           <form onSubmit={submitReview} className="space-y-4 max-w-lg">
//             <div>
//               <label className="block mb-1 font-semibold">Rating</label>
//               <select
//                 value={rating}
//                 onChange={(e) => setRating(Number(e.target.value))}
//                 className="w-full p-2 border rounded"
//               >
//                 {[5, 4, 3, 2, 1].map((r) => (
//                   <option key={r} value={r}>
//                     {r} Star{r > 1 ? "s" : ""}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block mb-1 font-semibold">Comment</label>
//               <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 rows={4}
//                 placeholder="Write your review here..."
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded shadow"
//             >
//               Submit Review
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/app/store/store";

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

interface Review {
  _id: string;
  user: {
    name: string;
  };
  rating: number;
  comment: string;
  sentiment?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function ProductCard() {
  const { slug } = useParams();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const token = localStorage.getItem("token");

        const productRes = await fetch(`${API_BASE}/api/products/slug/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const productData = await productRes.json();
        setProduct(productData);

        const reviewRes = await fetch(`${API_BASE}/api/reviews/${productData._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const reviewData = await reviewRes.json();
        setReviews(Array.isArray(reviewData.reviews) ? reviewData.reviews : []);
      } catch (err) {
        console.error("Error loading product or reviews", err);
        toast.error("Failed to load product or reviews.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProductAndReviews();
  }, [slug]);

  const handleAddToCart = async (product: Product) => {
    if (!isAuthenticated || !user?.token) {
      toast.error("Please log in to add items to your cart.");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/cart/add`, {
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

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("Comment cannot be empty");
    if (!product) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/reviews/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          rating,
          comment,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      const data = await res.json();
      setComment("");
      setRating(5);
      setReviews((prev) => [data.review, ...prev]);
      toast.success("Review submitted!");
    } catch (err) {
      console.error(err);
      toast.error("Error submitting review.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading product details...</div>;
  if (!product) return <div className="p-6 text-red-500">Product not found.</div>;

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
            onClick={() => handleAddToCart(product)}
            className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      {isLoggedIn && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="mb-4 border-b pb-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{review.user?.name || "Anonymous"}</p>
                  {review.sentiment && (
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        review.sentiment === "POSITIVE"
                          ? "bg-green-100 text-green-700"
                          : review.sentiment === "NEGATIVE"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {review.sentiment}
                    </span>
                  )}
                </div>
                <p className="text-yellow-600">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </p>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      )}

      {isLoggedIn && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Write a Review</h2>
          <form onSubmit={submitReview} className="space-y-4 max-w-lg">
            <div>
              <label className="block mb-1 font-semibold">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="Write your review here..."
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded shadow"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
