
// "use client";

// import { useSelector } from "react-redux";
// import { RootState } from "@/app/store";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const AdminDashboard = () => {
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (isAuthenticated && user?.isAdmin) {
//       setLoading(false);
//     } else {
//       setError("You do not have permission to access this page.");
//       router.push("/"); 
//     }
//   }, [isAuthenticated, user, router]);

//   if (loading) {
//     return <div className="p-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="p-8 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
//       <ul className="space-y-4">
//         <li><a href="/admin/products" className="text-blue-600 underline">Manage Products</a></li>
      
//         <li><a href="/admin/users" className="text-blue-600 underline">Manage Users</a></li>
//         <li><a href="/admin/orders" className="text-blue-600 underline">Manage Orders</a></li>
//       </ul>
//     </div>
//   );
// };

// export default AdminDashboard;
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminDashboard = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      setError("Unauthorized Access.");
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  if (error) {
    return <div className="p-8 text-center text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="p-20 max-w-lg mx-auto  bg-white shadow-lg mt-12 mb-12 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      <div className="space-y-4">
        <Link
          href="/admin/products"
          className="block border p-4 rounded-lg hover:bg-blue-100 transition font-medium"
        >
          📦 Manage Products
        </Link>

        <Link
          href="/admin/users"
          className="block border p-4 rounded-lg hover:bg-green-100 transition font-medium"
        >
          👥 Manage Users
        </Link>

        <Link
          href="/admin/orders"
          className="block border p-4 rounded-lg hover:bg-purple-100 transition font-medium"
        >
          🛒 Manage Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
