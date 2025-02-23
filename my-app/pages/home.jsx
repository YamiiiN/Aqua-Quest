import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  const apkDownloadUrl = "/aqua-quest-app.apk";

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col">
      <Navbar />

      <div className="w-full h-auto lg:h-[700px] bg-white shadow-lg overflow-hidden border border-gray-200 relative">
        {/* Background Image */}
        <img
          src="/images/homebg.png"
          alt="Banner"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute w-full h-full bg-black opacity-10"></div>

        {/* Content Wrapper */}
        <div className="relative w-full h-full flex flex-col lg:flex-row items-center px-6 lg:px-20 py-10 lg:py-0">
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left relative z-10 mt-10 lg:mt-32">
            <h3 className="text-black text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-md">
              Smart Predictions, Smarter Savings
            </h3>
            <p className="text-black text-md md:text-lg font-bold mt-2">
              Discover a smarter way to manage your water usage! Aqua Quest
              helps you predict your monthly water bill, save on costs, and
              learn about water conservation in an exciting and interactive way.
              Join the fight against water pollution while taking control of
              your consumption—effortlessly.
            </p>
            <button
              className="mt-4 px-6 py-3 bg-blue-500 text-black font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={() =>
                document
                  .getElementById("download-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started
            </button>
          </div>

          {/* Right Side: 3D Model */}
          <div className="w-full lg:w-1/2 flex justify-center items-center mt-10 lg:mt-0">
            <div className="w-[700px] h-[700px] sm:w-[800px] sm:h-800px] lg:w-[900px] lg:h-[900px]">
              <iframe
                src="https://my.spline.design/hand19copy-4e6083997cd6cca33be95744523a2734/"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 Smart Water Usage Predictions Section */}
      <div className="w-full bg-white py-16 px-6 lg:px-10 flex flex-col items-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-900 text-center mb-6">
          Smart Water Usage Predictions
        </h2>

        {/* Features Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {[
            {
              img: "prediction.png",
              title: "AI-Powered Bill Forecasts",
              text: "Get precise water bill predictions based on your usage history.",
            },
            {
              img: "tracking.png",
              title: "Real-Time Usage Tracking",
              text: "Monitor your daily water consumption with live analytics.",
            },
            {
              img: "conservation.png",
              title: "Smart Conservation Tips",
              text: "Reduce water waste with AI-driven conservation suggestions.",
            },
            {
              img: "budget.png",
              title: "Data-Driven Budget Planning",
              text: "Plan ahead and track your expenses with monthly reports.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 flex flex-col items-center text-center transition-all transform hover:scale-105"
            >
              <div className="w-40 h-40 bg-blue-100 flex items-center justify-center rounded-full mb-4">
                <img
                  src={`/images/${feature.img}`}
                  alt={feature.title}
                  className="w-32 h-32"
                />
              </div>
              <h3 className="text-lg font-bold text-blue-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-700">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
      {/* 🎮 Water Pollution Fighting Game Section */}
      <div className="w-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 py-16 px-6 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
          Join the Battle Against Water Pollution! 
        </h2>

        <p className="text-white text-lg text-center max-w-3xl mt-6">
          Aqua Quest isn’t just about water bill predictions—it’s also an
          exciting **adventure game**! Join forces to **defeat pollution
          monsters** , **restore clean water sources**, and **become an
          eco-warrior**! 
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-center">
          {[
            {
              img: "level.png",
              title: "Explore Exciting Levels",
              text: "Travel through different water environments and uncover hidden dangers!",
            },
            {
              img: "monster.png",
              title: "Defeat Pollution Monsters",
              text: "Battle toxic waste creatures and save endangered marine life!",
            },
            {
              img: "reward.png",
              title: "Earn Eco-Rewards",
              text: "Win badges and points for completing conservation challenges!",
            },
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={`/images/${feature.img}`}
                alt={feature.title}
                className="w-32 h-32 mb-3"
              />
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-white text-sm mt-1">{feature.text}</p>
            </div>
          ))}
        </div>

        <button
          className="mt-8 px-8 py-3 bg-green-400 text-black font-semibold text-lg rounded-lg shadow-md hover:bg-green-500 transition-all"
          onClick={() =>
            document
              .getElementById("download-section")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Play Now & Save Water! 🎮
        </button>
      </div>

      {/* 📱 Download Section */}
      <div
        id="download-section"
        className="bg-white flex flex-col lg:flex-row items-center justify-center flex-grow px-10 py-16 space-y-10 lg:space-y-0 lg:space-x-16"
      >
        {/* Phone Mockup */}
        <div className="relative w-[800px] h-[600px] rounded-[40px] overflow-hidden">
          <img
            src="/images/phone.jpg"
            alt="Phone Mockup"
            className="w-full h-full object-cover rounded-[40px]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 z-10">
            <img
              src="/images/AQlogo.jpg"
              alt="Water Droplet Logo"
              className="w-40 h-40"
            />
            <span className="mb-4 text-black text-6xl font-bold">
              AQUA QUEST
            </span>
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-blue-300 p-6 rounded-xl text-center shadow-lg w-full h-full max-w-md flex flex-col justify-between">
          <h2 className="text-xl font-bold text-black">
            Download via Link or QR Code
          </h2>

          {/* Android Download Button */}
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg mt-4 flex items-center justify-center mx-auto"
            onClick={() => (window.location.href = apkDownloadUrl)}
          >
            <span className="mr-2">⬇</span> DOWNLOAD FOR ANDROID
          </button>

          {/* QR Code */}
          <div className="mt-2 flex justify-center">
            <QRCodeCanvas
              value={window.location.origin + apkDownloadUrl}
              size={96}
            />
          </div>

          {/* Benefits of Downloading */}
          <h3 className="text-lg font-bold text-black mt-6">
            Why Download Aqua Quest?
          </h3>
          <ul className="text-black text-sm text-left mt-4 mx-auto max-w-sm">
            <li className="flex items-center">
              ✅ AI-powered water bill predictions
            </li>
            <li className="flex items-center">
              ✅ Cost-saving tips for better water management
            </li>
            <li className="flex items-center">
              ✅ Fun and educational pollution-fighting game
            </li>
            <li className="flex items-center">
              ✅ Easy-to-use analytics and tracking tools
            </li>
          </ul>

          <p className="text-black text-sm mt-6">
            Plan ahead, save money, and join the fight against water
            pollution—all in one app!
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
