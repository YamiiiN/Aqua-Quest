import React from "react";

import Head from "./components/nav";

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            <Head />
            <div className="w-full min-h-screen bg-white flex flex-col items-center p-4">
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                    {/* Banner Section */}
                    <div className="relative w-full h-64 bg-gray-300 flex items-center justify-center">
                        <h1 className="text-white text-3xl font-bold text-center drop-shadow-md">
                            Welcome to Aqua Quest!
                            <br />
                            <span className="text-lg font-normal">
                                Your trusted companion in managing and understanding your water bills!
                            </span>
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-9 gap-4 mt-6 w-full max-w-4xl">
                    <div className="bg-blue-500 text-white p-4 rounded-lg flex flex-col items-center text-center shadow-md hover:bg-blue-600 transition col-span-2 relative">
                        <img src="..\public\images\water.png" alt="Feature Icon" 
                            className="w-20 h-20 absolute -top-6" />
                        <p className="text-sm font-semibold mt-10">Analyze Your Water Usage</p>
                    </div>
                    <div className="bg-blue-500 text-white p-4 rounded-lg flex flex-col items-center text-center shadow-md hover:bg-blue-600 transition col-span-2 relative">
                        <img src="..\public\images\Bill.png" alt="Feature Icon" 
                            className="w-20 h-20 absolute -top-6" />
                        <p className="text-sm font-semibold mt-10">Predict Future Bills</p>
                    </div>
                    <div className="bg-blue-500 text-white p-4 rounded-lg flex flex-col items-center text-center shadow-md hover:bg-blue-600 transition col-span-2 relative">
                        <img src="..\public\images\pig.png" alt="Feature Icon" 
                            className="w-20 h-20 absolute -top-6" />
                        <p className="text-sm font-semibold mt-10">Save On Your Bill</p>
                    </div>
                    <div className="bg-blue-500 text-white p-4 rounded-lg flex flex-col items-center text-center shadow-md hover:bg-blue-600 transition col-span-3 relative">
                        <img src="..\public\images\Sword.png" alt="Feature Icon" 
                            className="w-20 h-20 absolute -top-6" />
                        <p className="text-sm font-semibold mt-10">Aqua Quest is an app designed to help you with you water bills while also having fun </p>
                    </div>
                </div>


            </div>
        </div>
    );
}