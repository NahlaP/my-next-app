// // app/login/page.tsx
// "use client";

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store';
// import { loginSuccess } from '../store/authSlice';
// import { useRouter, useSearchParams } from 'next/navigation';

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//   // Access the current user data from Redux state
//   const user = useSelector((state: RootState) => state.auth.user);

//   // Local state for email and password
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Check if user exists and the credentials match
//     if (user && email === user.email && password === user.password) {
//       dispatch(loginSuccess({ name: user.name, email: user.email }));
//       const redirectTo = searchParams.get('redirectTo') || '/homePage'; // Redirect after login
//       router.push(redirectTo); // Navigate to the target page or home
//     } else {
//       alert('Invalid credentials'); // Show error if login fails
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
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
//           className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700"
//         >
//           Login
//         </button>
        
//         <p className="mt-4 text-center">
//           <span className="text-sm text-gray-600">Don&apos;t have an account?</span>
//           <a
//             href="/signup"
//             className="text-sm text-blue-500 underline hover:text-blue-700 ml-1"
//           >
//             Sign Up
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { AppDispatch } from "../store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      toast.error("No user found. Please sign up first.");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.email === email && parsedUser.password === password) {
      dispatch(loginSuccess({ name: parsedUser.name, email: parsedUser.email }));
      toast.success("Login successful");

      setTimeout(() => {
        router.push("/homePage");
      }, 100);
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4 font-bold text-center text-gray-800">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          <span className="text-sm text-gray-600">Don&apos;t have an account?</span>
          <a
            href="/signup"
            className="text-sm text-blue-500 underline hover:text-blue-700 ml-1"
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
