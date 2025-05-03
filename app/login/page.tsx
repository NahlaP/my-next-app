


"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { AppDispatch } from "../store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
    
      const { token, user } = response.data;
      console.log("User from login:", user);
console.log("Type of isAdmin:", typeof user.isAdmin, "Value:", user.isAdmin);

    
      console.log("Logged-in user:", user); 
    
      localStorage.setItem("token", token);
      dispatch(loginSuccess({ name: user.name, email: user.email, isAdmin: user.isAdmin }));
      toast.success("Login successful!");
    
  
      if (user.isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/homepage");
      }
    } catch {
      setLoading(false);
      toast.error("Invalid credentials");
    }
    
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4 font-bold text-center text-gray-800">Login</h2>

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
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
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




