import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import Ranking from "../pages/ranking";
import AdminLogin from "../pages/admin/login";
import AdminDashboard from "../pages/admin/dashboard";
import UserManagement from "../pages/admin/user-management";
import GameAnalytics from "../pages/admin/game-analytics";

import "./index.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/login-as-admin" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/game-analytics" element={<GameAnalytics />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
