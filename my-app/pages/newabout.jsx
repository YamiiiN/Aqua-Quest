import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import Head from "./components/nav";

export default function About() {
    const navigate = useNavigate();
    const features = [
        {
            title: "📊 Water Usage Tracking",
            description: "Easily monitor your daily, weekly, and monthly water consumption with real-time data. Gain insights into your usage patterns and make informed decisions to reduce waste, save money, and promote sustainability. With our intuitive dashboard, you can track trends and take action before your bill surprises you.",
            image: "/images/2.png",
        },
        {
            title: "🔔 Bill Alerts & Reminders",
            description: "Never miss a due date again! Our smart notification system will remind you about upcoming water bill payments, ensuring you stay on top of your expenses. Set custom alerts to receive timely reminders and avoid unnecessary late fees. Manage your finances effortlessly and stay stress-free!",
            image: "/images/3.png",
        },
        {
            title: "🎮 Interactive Game",
            description: "Learn about water conservation in an engaging and fun way! Our interactive game challenges you to complete missions that promote smart water usage. Earn rewards, unlock achievements, and compete with friends while building good habits that help conserve water at home and in your community.",
            image: "/images/4.png",
        },
        {
            title: "💡 Water Saving Tips",
            description: "Discover practical and effective ways to reduce water waste without compromising your lifestyle. Our expert-backed tips help you optimize water usage in your household, from fixing leaks to using appliances efficiently. Small changes can make a big impact—start saving today!",
            image: "/images/5.png",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Include Transparent Navbar */}
            <Head
            />
            <div className="w-screen min-h-screen bg-white flex flex-col items-center">

                {/* 🏞️ Banner Section */}
                <div className="w-full h-[600px] bg-white shadow-lg overflow-hidden border border-gray-200 relative">
                    {/* Background Image */}
                    <img 
                        src="/images/bannerBg.png" 
                        alt="Banner" 
                        className="absolute w-full h-full object-cover"
                    />
                    
                    {/* Content Wrapper */}
                    <div className="relative w-full h-full flex items-center px-20">
                        {/* Left Side: Text Content */}
                        <div className="w-1/2">
                            <h1 className="text-black text-4xl font-extrabold drop-shadow-md">
                                Welcome to Aqua Quest!
                            </h1>
                            <p className="text-lg font-normal mt-2">
                                Your trusted companion in managing and understanding your water bills!
                            </p>
                            <button 
                                onClick={() => navigate("/")}
                                className="mt-4 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition"
                            >
                                Use Our App
                            </button>
                        </div>

                        {/* Right Side: Larger App Image */}
                        <div className="w-1/2 flex justify-end"> 
                            <img 
                                src="/images/1.png" 
                                alt="Aqua Quest App" 
                                className="w-full max-w-[1200px] h-140 object-contain"
                            />
                        </div>
                    </div>
                </div>


                {/* 💧 Our Mission Section */}
                <div className="w-screen bg-blue-100 py-16 px-6 flex flex-col items-center">
                    <h2 className="text-4xl font-extrabold text-blue-900 text-center mt-8 mb-4">Our Mission</h2>
                    <p className="text-black text-lg text-center max-w-3xl mt-4">
                        At Aqua Quest, we strive to help households and businesses manage their water consumption efficiently. 
                        Our goal is to provide insightful analytics, practical solutions, and a fun way to save on water bills.
                    </p>
                </div>

                {/* 💧 Features Slideshow */}
                <div className="w-screen h-[700px] flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-extrabold text-blue-900 text-center mt-8 mb-4">Key Features of Aqua Quest</h2>
                    <p className="text-gray-700 text-lg text-center max-w-3xl mt-2">
                        Explore the powerful features of Aqua Quest, designed to simplify water management, promote conservation, and enhance your overall experience.  
                    </p>

                    {/* Full-Width Swiper Slideshow */}
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        autoplay={{ delay: 5000 }}
                        loop={true}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
                        className="w-full h-full mt-2 relative"
                    >
                        {features.map((feature, index) => (
                            <SwiperSlide key={index} className="w-full h-[600px] flex items-center justify-center px-10">
                                {/* Content Wrapper */}
                                <div className="w-full h-full flex flex-row items-center justify-end">
                                    {/* Left: Feature Text */}
                                    <div className="m-20 w-1/2 text-left">
                                        <h3 className="text-3xl font-bold text-blue-800">{feature.title}</h3>
                                        <p className="mt-4 text-lg text-black">{feature.description}</p>
                                    </div>

                                    {/* Right: Feature Image */}
                                    <div className="w-1/2 flex justify-end">
                                        <img 
                                            src={feature.image} 
                                            alt={feature.title} 
                                            style={{ width: "800px", height: "600px" }}
                                            className="object-contain mix-blend-multiply"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}

                        {/* Invisible Navigation Arrows */}
                        <div className="swiper-button-prev !hidden md:!block !opacity-0"></div>
                        <div className="swiper-button-next !hidden md:!block !opacity-0"></div>
                    </Swiper>
                </div>

                {/* 💠 Global Water Challenges */}
                <div className="w-screen bg-blue-100 py-16 px-6 flex flex-col items-center">
                    <h2 className="text-4xl font-extrabold text-blue-900 text-center mt-8 mb-4">Global Water Challenges</h2>
                    <p className="text-black text-lg text-center max-w-3xl mt-4">
                        Water is essential for life, yet millions of people face challenges in accessing clean and safe water. 
                        Understanding these challenges helps us take action for a better future.
                    </p>

                    {/* Issues List */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-5xl">
                        <div className="bg-blue-200 p-6 rounded-lg shadow-md text-center transition-all transform hover:scale-105 hover:bg-blue-300">
                            <h3 className="text-xl font-bold text-blue-800">🚱 Water Scarcity</h3>
                            <p className="mt-2 text-black">
                                Many regions experience severe water shortages due to overuse, climate change, and pollution.
                            </p>
                        </div>
                        <div className="bg-blue-200 p-6 rounded-lg shadow-md text-center transition-all transform hover:scale-105 hover:bg-blue-300">
                            <h3 className="text-xl font-bold text-blue-800">💧 Contaminated Water</h3>
                            <p className="mt-2 text-black">
                                Poor water quality affects millions, leading to diseases and environmental damage.
                            </p>
                        </div>
                        <div className="bg-blue-200 p-6 rounded-lg shadow-md text-center transition-all transform hover:scale-105 hover:bg-blue-300">
                            <h3 className="text-xl font-bold text-blue-800">🚽 Lack of Sanitation</h3>
                            <p className="mt-2 text-black">
                                Limited access to clean water and sanitation impacts public health worldwide.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
