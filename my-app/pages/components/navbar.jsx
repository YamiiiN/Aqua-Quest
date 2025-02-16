import React from "react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-transparent p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-black text-2xl font-bold drop-shadow-md">Aqua Quest</h1>
                
                {/* Navigation Links */}
                <ul className="flex space-x-6">
                    <li>
                        <a 
                            href="/" 
                            className="text-black font-medium transition duration-300 ease-in-out hover:text-blue-700 hover:scale-105"
                        >
                            Download
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/newabout" 
                            className="text-black font-medium transition duration-300 ease-in-out hover:text-blue-700 hover:scale-105"
                        >
                            Community
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/about" 
                            className="text-black font-medium transition duration-300 ease-in-out hover:text-blue-700 hover:scale-105"
                        >
                            About Us
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
