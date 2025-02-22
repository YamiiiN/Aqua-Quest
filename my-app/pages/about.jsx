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
  const predictiveFeatures = [
    {
      title: "📊 Smart Water Usage Predictions",
      description:
        "Our AI-powered system predicts your monthly water bill based on past consumption. Get insights on how much you'll likely pay and adjust your usage accordingly.",
      image: "/images/analysis1.png",
    },
    {
      title: "🔍 Personalized Insights",
      description:
        "Receive tailored advice on how to optimize your water consumption, reduce waste, and lower your bills with our advanced analytics dashboard.",
      image: "/images/analysis2.png",
    },
    {
      title: "📉 Cost-Saving Strategies",
      description:
        "See where you can save! Our system highlights peak usage times and offers actionable suggestions to help you cut down on unnecessary expenses.",
      image: "/images/analysis3.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="w-screen min-h-screen bg-white flex flex-col items-center">
        {/* 🏞️ Banner Section */}
        <div className="w-full h-[800px] bg-white shadow-lg overflow-hidden border border-gray-200 relative">
          <img
            src="/images/aboutus.png"
            alt="Banner"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute w-full h-full bg-black opacity-10"></div>
          <div className="relative w-full h-full flex items-center justify-center px-20">
            <div className="w-1/2 flex flex-col items-center text-center justify-center">
              <h1 className="text-black text-6xl font-extrabold drop-shadow-md">
                Our Mission
              </h1>
              <p className="text-black text-2xl font-bold mt-2">
                Aqua Quest is designed to empower users with smart water
                consumption analytics and an engaging game that raises awareness
                about water pollution. Manage your water usage with AI-powered
                predictions and battle water pollution monsters in an
                interactive adventure!
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 px-6 py-3 bg-blue-700 text-black font-semibold rounded-lg shadow-md hover:bg-blue-900 transition"
              >
                Use Our App
              </button>
            </div>
          </div>
        </div>

        {/* 📊 Predictive Analysis Slideshow */}
        <div className="w-screen h-[700px] flex flex-col items-center justify-center">
          <h2 className="text-4xl font-extrabold text-blue-900 text-center mt-8 mb-4">
            Predict Your Water Bill with AI
          </h2>
          <p className="text-gray-700 text-lg text-center max-w-3xl mt-2">
            Stay ahead of your water expenses with our AI-driven predictive
            analysis. Our system helps you estimate monthly costs, detect high
            usage trends, and suggest ways to save.
          </p>

          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 3000 }}
            loop={true}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className="w-full h-full mt-2 relative"
          >
            {predictiveFeatures.map((feature, index) => (
              <SwiperSlide
                key={index}
                className="w-full h-[600px] flex items-center justify-center px-10"
              >
                <div className="w-full h-full flex flex-row items-center justify-end">
                  <div className="m-20 w-1/2 text-left">
                    <h3 className="text-3xl font-bold text-blue-800">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-lg text-black">
                      {feature.description}
                    </p>
                  </div>
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
          </Swiper>
        </div>

        {/* 🎮 Fighting Game Against Water Pollution */}
        <div className="w-screen bg-blue-100 py-16 px-6 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-blue-900 text-center mt-8 mb-4">
            Battle Against Water Pollution!
          </h2>
          <p className="text-black text-lg text-center max-w-3xl mt-4">
            Engage in an exciting adventure where you fight against pollution
            monsters and learn how to protect our water sources. Complete
            missions, level up, and become an environmental hero!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-5xl">
            <div className="bg-blue-200 p-6 rounded-lg shadow-md text-center transition-all transform hover:scale-105 hover:bg-blue-300">
              <h3 className="text-xl font-bold text-blue-800">
                👹 Defeat Pollution Monsters
              </h3>
              <p className="mt-2 text-black">
                Face off against toxic waste beasts, oil spill serpents, and
                plastic invaders in thrilling battles!
              </p>
            </div>
            <div className="bg-blue-200 p-6 rounded-lg shadow-md text-center transition-all transform hover:scale-105 hover:bg-blue-300">
              <h3 className="text-xl font-bold text-blue-800">
                🏆 Earn Rewards & Achievements
              </h3>
              <p className="mt-2 text-black">
                Complete levels, earn points, and unlock rewards as you learn
                how to save water!
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition"
          >
            Play the Game
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
