"use client";

import { useState } from 'react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock forgot password (replace with real API)
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network delay
    alert(`Reset link sent to ${email}`);
    
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleForgotPassword} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          className="w-full mb-6 px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
