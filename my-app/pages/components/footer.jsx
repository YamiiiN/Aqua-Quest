import React from "react";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 py-8 text-center">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                
                {/* Logo / Branding */}
                <div className="text-center md:text-left">
                    <h1 className="text-white text-2xl font-bold">
                        Aqua Quest
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Your trusted companion in managing water consumption.
                    </p>
                </div>

                {/* Social Media Links */}
                {/* <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="/images/facebook.png" alt="Facebook" className="h-6 w-6"/>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="/images/twitter.png" alt="Twitter" className="h-6 w-6"/>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="/images/instagram.png" alt="Instagram" className="h-6 w-6"/>
                    </a>
                </div> */}
            </div>

            {/* Copyright Section */}
            <p className="text-gray-500 text-sm mt-6">
                &copy; {new Date().getFullYear()} Aqua Quest. All rights reserved.
            </p>
        </footer>
    );
}
