// // app/admin/page.tsx

// "use client";

// import { useSelector } from "react-redux";
// import { RootState } from "@/app/store";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const AdminPage = () => {
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated || !user?.isAdmin) {
//       router.push("/"); // Not allowed, redirect to home if not an admin
//     }
//   }, [isAuthenticated, user, router]);

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold">Admin Panel</h1>
//       <p>Only accessible to admin users.</p>
//     </div>
//   );
// };

// export default AdminPage;
