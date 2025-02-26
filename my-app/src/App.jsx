import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import Ranking from "../pages/ranking";
import AdminLogin from "../pages/admin/login";
import AdminDashboard from "../pages/admin/dashboard";
import UserManagement from "../pages/admin/user-management";
import GameAnalytics from "../pages/admin/game-analytics";
import ProtectedRoute from "./middleware/ProtectedRoute";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/login-as-admin" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
<Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
<Route path="/game-analytics" element={<ProtectedRoute><GameAnalytics /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
