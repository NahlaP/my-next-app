
"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signup } from "../store/authSlice";
import { AppDispatch } from "../store";
import { toast } from "sonner";

const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const user = { name, email, password };

    // Save to Redux
    dispatch(signup(user));

    // Also save to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    toast.success("Signup successful!");

    // Redirect to login after short delay
    setTimeout(() => {
      router.push("/login");
    }, 200);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center">
          <span className="text-sm text-gray-600">Already have an account?</span>
          <a
            href="/login"
            className="text-sm text-blue-500 underline hover:text-blue-700 ml-1"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
