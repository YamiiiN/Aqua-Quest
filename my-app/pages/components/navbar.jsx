import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "/images/AQLogo.png"; // Adjust the path based on your project structure

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 to-blue-900 p-4 shadow-lg">
      <div className="max-w-full mx-auto flex justify-between items-center px-4 md:px-10">
        {/* Logo & Brand Name */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Aqua Quest Logo" className="h-10 w-10 object-contain" />
          <h1 className="text-white text-2xl font-bold drop-shadow-md">
            <a href="/" className="hover:text-gray-200 transition-all duration-300">
              Aqua Quest
            </a>
          </h1>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={`flex-col md:flex-row md:flex space-x-0 md:space-x-8 text-lg font-semibold absolute md:static top-16 left-0 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-900 md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
          <li>
            <a
              href="/"
              className="text-white px-6 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-700 hover:shadow-md hover:scale-105 active:scale-95"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/ranking"
              className="text-white px-6 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-700 hover:shadow-md hover:scale-105 active:scale-95"
            >
              Ranking
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-white px-6 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-700 hover:shadow-md hover:scale-105 active:scale-95"
            >
              About Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}