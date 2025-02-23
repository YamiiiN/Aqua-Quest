import React from "react";
import { useLocation } from "react-router-dom";
import logo from "/images/AQlogo.jpg"; // Adjust the path based on your project structure

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 to-blue-900 p-4 shadow-lg">
      <div className="max-w-full mx-auto flex justify-between items-center px-10">
        {/* Logo & Brand Name */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Aqua Quest Logo" className="h-10 w-10 object-contain" />
          <h1 className="text-white text-2xl font-bold drop-shadow-md">
            <a href="/" className="hover:text-gray-200 transition-all duration-300">
              Aqua Quest
            </a>
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-8 text-lg font-semibold">
          <li>
            <a
              href="/"
              className="text-white px-6 py-3 rounded-lg transition-all duration-300 ease-in-out 
                hover:bg-white hover:text-blue-700 hover:shadow-md hover:scale-105 active:scale-95"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/ranking"
              className="text-white px-6 py-3 rounded-lg transition-all duration-300 ease-in-out 
                hover:bg-white hover:text-blue-700 hover:shadow-md hover:scale-105 active:scale-95"
            >
              Ranking
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-white px-6 py-3 rounded-lg transition-all duration-300 ease-in-out 
                hover:bg-white hover:text-blue-700 hover:shadow-md hover:scale-105 active:scale-95"
            >
              About Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
