import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function About() {
  const navigate = useNavigate();
  const awarenessSlides = [
    {
      title: "🚱 Global Water Crisis",
      description:
        "Over 2 billion people lack access to safe drinking water. It's crucial to conserve and manage our water resources wisely.",
      image: "/images/watercrisis.png",
    },
    {
      title: "🌍 Climate Change & Water Scarcity",
      description:
        "Rising temperatures and pollution are reducing our clean water supply. Small changes in our daily habits can make a big difference.",
      image: "/images/climatewater.png",
    },
    {
      title: "💧 Preventing Water Pollution",
      description:
        "Industrial waste, plastic pollution, and improper disposal of chemicals threaten our water sources. Awareness and action are needed now more than ever.",
      image: "/images/pollution.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="w-full min-h-screen bg-white flex flex-col items-center">
        {/* 🏞️ Banner Section */}
        <div className="w-full h-[600px] relative flex items-center justify-center bg-black">
          <img
            src="/images/aboutus.png"
            alt="Banner"
            className="absolute w-full h-full object-cover opacity-70"
          />
          <div className="relative text-center px-6 max-w-3xl">
            <h3 className="text-white text-5xl font-extrabold drop-shadow-md">Our Mission</h3>
            <p className="text-white text-lg font-medium mt-4">
              Aqua Quest empowers users with smart water analytics and an engaging game to raise awareness about water pollution. Manage your water usage with AI-powered predictions and battle pollution monsters in an interactive adventure!
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition"
            >
              Use Our App
            </button>
          </div>
        </div>

        {/* 🌍 Awareness Slideshow */}
        <div className="w-full py-16 bg-gray-100 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-blue-900 text-center mb-4">Understanding Water Challenges</h2>
          <p className="text-gray-700 text-lg text-center max-w-3xl mb-6">
            Water is a precious resource, yet pollution, overconsumption, and climate change are pushing us toward scarcity. Learn about these challenges and how you can make a difference.
          </p>

          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 4000 }}
            loop={true}
            spaceBetween={50}
            slidesPerView={1}
            className="w-full max-w-4xl"
          >
            {awarenessSlides.map((slide, index) => (
              <SwiperSlide key={index} className="flex flex-col items-center text-center px-6">
                <img src={slide.image} alt={slide.title} className="w-full max-h-96 object-contain" />
                <h3 className="text-2xl font-bold text-blue-800 mt-4">{slide.title}</h3>
                <p className="mt-2 text-lg text-gray-700">{slide.description}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 💙 Why Choose Aqua Quest? */}
        <div className="w-full bg-blue-900 text-white py-16 px-6 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-center">💙 Why Choose Aqua Quest?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-5xl">
            {["💰 Save Water, Save Money", "🎮 Interactive & Engaging", "🌱 Eco-Friendly Impact"].map((title, index) => (
              <div key={index} className="bg-white text-blue-900 p-6 rounded-lg shadow-md text-center hover:scale-105 transition">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-2">{index === 0 ? "Reduce unnecessary water expenses with AI predictions." : index === 1 ? "Learn water conservation through fun, interactive gameplay." : "Every action in the game contributes to real-world awareness."}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🚀 Meet the Team */}
        <div className="w-full bg-white py-16 px-6 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-center">🚀 Meet the Team</h2>
          <p className="mt-4 text-lg text-gray-700 text-center max-w-3xl">
            Aqua Quest was developed by <strong>Group 7</strong> from <strong>TUP Taguig</strong>, passionate <strong>BSIT students</strong> merging technology and sustainability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-5xl">
            {["Eliseo", "jaser", "tin"].map((name, index) => (
              <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                <img src={`/images/${name.toLowerCase().replace(/ /g, '')}.jpg`} alt={name} className="w-32 h-32 rounded-full object-cover shadow-md" />
                <h3 className="text-xl font-bold text-blue-900 mt-4">{name}</h3>
                <p className="text-gray-700">Developer</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
