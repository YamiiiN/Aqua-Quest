import React from "react";

export default function Head()
{
    return(
    <nav className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
          <span className="text-white text-lg font-bold">AQUA QUEST</span>
        </div>
        <div className="space-x-6 text-white font-semibold">
          <a href="#" className="hover:underline">DOWNLOAD</a>
          <a href="#" className="hover:underline">ABOUT US</a>
        </div>
    </nav>
    );
}