import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@aquaquest.com" && password === "admin123") {
      navigate("/admin-dashboard");
    } else {
      alert("Invalid credentials. Try again!");
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/loginbg.jpg')" }}
    >
      <div className="bg-white/30 backdrop-blur-md p-10 rounded-lg shadow-xl w-[400px] text-center">
        <h2 className="text-3xl font-extrabold text-blue-900">Admin Login</h2>
        <p className="text-black text-sm mt-2">
          Sign in to manage Aqua Quest
        </p>

        <form onSubmit={handleLogin} className="mt-6">
          {/* Email Input */}
          <div className="mb-4 text-left">
            <label className="block text-black font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white/70 text-gray-800"
              placeholder="admin@aquaquest.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 text-left">
            <label className="block text-black font-semibold">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white/70 text-gray-800"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-900 text-black font-bold py-3 rounded-lg transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Forgot Password */}
        <p className="mt-4 text-sm text-black">
          Forgot password? <span className="text-blue-300 cursor-pointer">Reset here</span>
        </p>
      </div>
    </div>
  );
}
