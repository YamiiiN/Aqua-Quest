import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function FeaturesSlider() {
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
        <div className="w-screen h-[700px] flex flex-col items-center justify-center">
            <h2 className="text-4xl font-extrabold text-blue-900 text-center mt-8 mb-4">Key Features of Aqua Quest</h2>
            <p className="text-gray-700 text-lg text-center max-w-3xl mt-2 mb-2">
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
                        <div className="w-full max-w-6xl flex flex-row items-center justify-end">
                            {/* Left: Feature Text */}
                            <div className="w-1/3 text-left">
                                <h3 className="text-3xl font-bold text-blue-800">{feature.title}</h3>
                                <p className="mt-4 text-lg text-black">{feature.description}</p>
                            </div>

                            {/* Right: Feature Image */}
                            <div className="w-2/3 flex justify-end">
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
    );
}
