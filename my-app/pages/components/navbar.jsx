import React from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about"; // Check if on the About page

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900 to-blue-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold drop-shadow-md">
          <a href="/" className="hover:text-gray-200 transition-all duration-300">
            Aqua Quest
          </a>
        </h1>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <a
              href="/"
              className="text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 ease-in-out 
                hover:bg-white hover:text-blue-700 hover:shadow-md hover:scale-105 active:scale-95"
            >
              Download
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 ease-in-out 
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
