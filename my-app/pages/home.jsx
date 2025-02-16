import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "./components/navbar";
import Head from "./components/nav";

export default function Home() {
    const apkDownloadUrl = "/aqua-quest-app.apk"; 
    const iosDownloadUrl = "/aqua-quest-app.apk"; 

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col">
            <Head />
            <div className="flex flex-col lg:flex-row items-center justify-center flex-grow px-10 py-16 space-y-10 lg:space-y-0 lg:space-x-16">
                {/* Phone Mockup */}
                <div className="relative w-[600px] h-[400px] rounded-[40px] overflow-hidden">
                    <img src="/images/phone.jpg" alt="Phone Mockup" className="w-full h-full object-cover rounded-[40px]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 z-10">
                        <img src="/images/AQlogo.jpg" alt="Water Droplet Logo" className="w-32 h-32" />
                        <span className="mb-4 text-black text-4xl font-bold">AQUA QUEST</span>
                    </div>
                </div>

                {/* Download Section */}
                <div className="bg-blue-300 p-6 rounded-xl text-center shadow-lg w-full h-full max-w-md flex flex-col justify-between">
                    <h2 className="text-xl font-bold text-black">Download via link or QR Code</h2>
                    
                    {/* Android Download */}
                    <button 
                        className="bg-green-500 text-white px-6 py-2 rounded-lg mt-4 flex items-center justify-center mx-auto"
                        onClick={() => window.location.href = apkDownloadUrl}
                    >
                        <span className="mr-2">⬇</span> DOWNLOAD FOR ANDROID
                    </button>
                    <div className="mt-2 flex justify-center">
                        <QRCodeCanvas value={window.location.origin + apkDownloadUrl} size={96} />
                    </div>
                    
                    {/* iOS Download */}
                    <button 
                        className="bg-gray-800 text-white px-6 py-2 rounded-lg mt-4 flex items-center justify-center mx-auto"
                        onClick={() => window.location.href = iosDownloadUrl}
                    >
                        <span className="mr-2">🍏</span> DOWNLOAD FOR iOS
                    </button>
                    <div className="mt-2 flex justify-center">
                        <QRCodeCanvas value={iosDownloadUrl} size={96} />
                    </div>

                    <p className="text-black text-sm mt-4">
                        SAVE MONEY AND PLAN AHEAD WITH OUR WATER BILL ANALYSIS TOOLS. TRACK USAGE, PREDICT FUTURE BILLS, AND DISCOVER WAYS TO REDUCE COSTS—ALL IN ONE PLACE.
                    </p>
                </div>
            </div>
        </div>
    );
}
