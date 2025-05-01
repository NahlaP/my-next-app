// // app/admin/login/page.tsx

// "use client";

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "@/app/store/authSlice";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import axios from "axios";

// const AdminLoginPage = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       const { token, user } = response.data;

//       // Store the token and user info in Redux and localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));

//       dispatch(loginSuccess(user));

//       toast.success("Admin login successful!");

//       // Redirect to the admin dashboard after successful login
//       setTimeout(() => {
//         router.push("/admin");
//       }, 100);
//     } catch (err: any) {
//       setLoading(false);
//       toast.error("Invalid credentials or not an admin user");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-6 rounded shadow-md w-full max-w-sm"
//       >
//         <h2 className="text-2xl mb-4 font-bold text-center text-gray-800">Admin Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-4 px-4 py-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-4 px-4 py-2 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLoginPage;
