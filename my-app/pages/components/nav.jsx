import React from "react";

export default function Head() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img 
          src="/images/AQlogo.jpg" 
          alt="Aqua Quest Logo" 
          className="w-10 h-10 rounded-full" 
        />
        <span className="text-white text-lg font-bold">AQUA QUEST</span>
      </div>
      <div className="space-x-6 text-white font-semibold">
        <a href="#" className="hover:underline">DOWNLOAD</a>
        <a href="#" className="hover:underline">ABOUT US</a>
      </div>
    </nav>
  );
}
