import React from "react";
import Head from "./components/nav";

export default function Home(){
    return(
        <div className="min-h-screen bg-white">
            <Head/>
            <div className="flex flex-col lg:flex-row items-center justify-center px-10 py-16 space-y-10 lg:space-y-0 lg:space-x-16">
                {/* Phone Mockup */}
                <div className="relative">
                <div className="w-72 h-36 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg border">
                    <span className="text-2xl font-bold">AQUA QUEST</span>
                </div>
                </div>

                {/* Download Section */}
                <div className="bg-blue-200 p-6 rounded-xl ml-text-center shadow-lg max-w-md">
                <h2 className="text-xl font-bold text-black">Download via link or QR Code</h2>
                <button className="bg-black text-white px-6 py-2 rounded-lg mt-4 flex items-center justify-center mx-auto">
                    <span className="mr-2">⬇</span> DOWNLOAD NOW
                </button>
                <div className="mt-4">
                    <div className="w-20 h-20 bg-black mx-auto"></div> {/* Placeholder for QR Code */}
                </div>
                <p className="text-black text-sm mt-4">
                    SAVE MONEY AND PLAN AHEAD WITH OUR WATER BILL ANALYSIS TOOLS. TRACK USAGE, PREDICT FUTURE BILLS, AND DISCOVER WAYS TO REDUCE COSTS—ALL IN ONE PLACE.
                </p>
                </div>
            </div>
        </div>
    );
}