import React, { useState } from "react";
import { motion } from "framer-motion";
import Head from "./components/nav";

const FlipCard = ({ imageSrc, frontText, frontDesc, backText }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="w-64 h-60 cursor-pointer flex flex-col items-center relative transition-transform hover:scale-105"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            {/* Larger Image Stays in Front */}
            <div className="absolute -top-12 w-20 h-20 z-10">
                <img src={imageSrc} alt="Feature Icon" className="w-full h-full" />
            </div>

            {/* Flip Animation */}
            <motion.div
                className="relative w-full h-full bg-blue-500 text-white p-6 rounded-lg flex flex-col items-center text-center shadow-lg transition-all"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
            >
                {!isFlipped ? (
                    <>
                        <p className="text-lg font-semibold mt-16">{frontText}</p>
                        <p className="text-sm mt-2">{frontDesc}</p>
                    </>
                ) : (
                    <motion.p className="text-sm mt-4 px-2" style={{ rotateY: 180 }}>
                        {backText}
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
};

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            <Head />
            
            {/* 🌊 Banner Section */}

            <div className="w-full bg-white p-0">
                <div className="w-full h-[300px] bg-white shadow-lg overflow-hidden border border-gray-200">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img 
                            src="/images/banner.jpg" 
                            alt="Banner" 
                            className="absolute w-full h-full object-cover"
                        />
                        <div className="relative text-center p-4">
                            <h1 className="text-white text-3xl font-bold drop-shadow-md">
                                Welcome to Aqua Quest!
                                <br />
                                <span className="text-lg font-normal">
                                    Your trusted companion in managing and understanding your water bills!
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* 💧 Features Section */}
            <div className="w-full flex justify-center mt-12">
                <div className="w-full max-w-6xl">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        Key Features
                    </h2>

                    {/* Grid: Ensures All Cards Fit in One Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 justify-center">
                        <FlipCard 
                            imageSrc="/images/water.png"
                            frontText="Analyze Your Water Usage"
                            frontDesc="Track and optimize your water consumption."
                            backText="Monitor daily, weekly, and monthly water usage to identify areas of excessive consumption."
                        />

                        <FlipCard 
                            imageSrc="/images/Bill.png"
                            frontText="Predict Future Bills"
                            frontDesc="Estimate your next water bill easily."
                            backText="Based on historical data, Aqua Quest forecasts your future bills. Plan your budget more efficiently!"
                        />

                        <FlipCard 
                            imageSrc="/images/pig.png"
                            frontText="Save On Your Bill"
                            frontDesc="Cut costs with smart water-saving tips."
                            backText="Get tailored advice on how to use water efficiently. Fix leaks, use appliances wisely, and adjust habits!"
                        />

                        <FlipCard 
                            imageSrc="/images/Sword.png"
                            frontText="Aqua Quest: Manage Your Water Bills"
                            frontDesc="Make bill management simple and fun!"
                            backText="Aqua Quest not only tracks your water consumption but also gamifies it. Earn points and unlock achievements!"
                        />
                    </div>
                </div>
            </div>

            {/* ❓ Why Choose Aqua Quest? */}
            <div className="w-full flex justify-center mt-16 bg-blue-100">
                <div className="w-full max-w-6xl">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mt-12 mb-6">
                        Why Choose Aqua Quest?
                    </h2>
                    <p className="text-gray-600 text-center mb-12">
                        Aqua Quest is more than just a billing tool—it's an interactive way to learn, save, and manage your water usage efficiently.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
                        <FlipCard 
                            imageSrc="/images/smart.png"
                            frontText="Smart Insights"
                            frontDesc="Get real-time usage analytics."
                            backText="With Aqua Quest's smart insights, you receive up-to-date data on your water usage, highlighting inefficiencies."
                        />

                        <FlipCard 
                            imageSrc="/images/game.png"
                            frontText="Interactive & Fun"
                            frontDesc="Turn water management into a game!"
                            backText="Aqua Quest incorporates interactive elements, challenges, and rewards to make sustainability fun and engaging!"
                        />

                        <FlipCard 
                            imageSrc="/images/support.png"
                            frontText="24/7 Support"
                            frontDesc="We're here to help anytime."
                            backText="Our dedicated support team is available 24/7 to assist you with billing predictions, troubleshooting, and more!"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
