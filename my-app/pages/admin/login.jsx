import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch(
        "https://aqua-quest-backend-deployment.onrender.com/api/admin/admin-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // ✅ Save token to localStorage
      localStorage.setItem("adminToken", data.token);

      // ✅ Redirect to admin dashboard
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/loginbg.jpg')" }}
    >
      <div className="bg-white/30 backdrop-blur-md p-10 rounded-lg shadow-xl w-[400px] text-center">
        <h2 className="text-3xl font-extrabold text-maroon-900">Admin Login</h2>
        <p className="text-black text-sm mt-2">Sign in to manage Aqua Quest</p>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <form onSubmit={handleAdminLogin} className="mt-6">
          <div className="mb-4 text-left">
            <label className="block text-black font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:outline-none bg-white/70 text-gray-800"
              placeholder="admin@aquaquest.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 text-left">
            <label className="block text-black font-semibold">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:outline-none bg-white/70 text-gray-800"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full  bg-blue-700 hover:bg-blue-900  text-white font-bold py-3 rounded-lg transition-all"
          >
            Sign In
          </button>
        </form>

       
      </div>
    </div>
  );
}
