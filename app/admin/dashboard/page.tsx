"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <ul className="space-y-4">
        <li><a href="/admin/products" className="text-blue-600 underline">Manage Products</a></li>
      
      </ul>
    </div>
  );
};

export default AdminDashboard;
