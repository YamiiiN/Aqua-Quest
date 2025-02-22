import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  const apkDownloadUrl = "/aqua-quest-app.apk";

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col">
      <Navbar />

      <div className="w-full h-[800px] bg-white shadow-lg overflow-hidden border border-gray-200 relative">
        {/* Background Image */}
        <img
          src="/images/homebg.png"
          alt="Banner"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute w-full h-full bg-black opacity-10"></div>
        {/* Content Wrapper */}
        <div className="relative w-full h-full flex items-center px-20">
          {/* Left Side: Text Content */}
          <div className="ml-8 w-1/2 relative z-10">
            <h1 className="text-black text-6xl font-extrabold drop-shadow-md">
              Welcome to Aqua Quest!
            </h1>
            <p className="text-black text-lg font-bold mt-2">
              Discover a smarter way to manage your water usage! Aqua Quest
              helps you predict your monthly water bill, save on costs, and
              learn about water conservation in an exciting and interactive way.
              Join the fight against water pollution while taking control of
              your consumption—effortlessly.
            </p>
            <button
              className="mt-4 px-6 py-3 bg-blue-700 text-black font-semibold rounded-lg shadow-md hover:bg-blue-900 transition"
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center overflow-visible z-10 animate-floating mt-16 ml-84">
            <iframe
              src="https://my.spline.design/untitled-5a1bca2e52f0e8655211a23264fc029b/"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className="absolute"
            ></iframe>
          </div>
        </div>
      </div>

      {/* 📊 Smart Water Usage Predictions Section */}
      <div className="w-full bg-white py-16 px-10 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-blue-900 text-center mb-6">
          Smart Water Usage Predictions
        </h2>

        {/* Features Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full px-10">
          {/* 📈 AI-Powered Bill Forecasts */}
          <div className="p-6  rounded-lg transition-all transform hover:scale-105 flex flex-col items-center text-center w-full">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <img
                src="/images/prediction.png"
                alt="Bill Forecasts"
                className="w-16 h-16 "
              />
            </div>
            <h3 className="text-lg font-bold text-blue-800">
              {" "}
              AI-Powered Bill Forecasts
            </h3>
            <p className="mt-2 text-gray-700">
              Get precise water bill predictions based on your usage history,
              ensuring no surprises in your monthly expenses.
            </p>
          </div>

          {/* 📊 Real-Time Usage Tracking */}
          <div className="p-6  rounded-lg transition-all transform hover:scale-105 flex flex-col items-center text-center w-full">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <img
                src="/images/tracking.png"
                alt="Usage Tracking"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-lg font-bold text-blue-800">
              {" "}
              Real-Time Usage Tracking
            </h3>
            <p className="mt-2 text-gray-700">
              Monitor your daily water consumption with live analytics to better
              understand and manage your usage.
            </p>
          </div>

          {/* 💡 Smart Conservation Tips */}
          <div className="p-6  rounded-lg transition-all transform hover:scale-105 flex flex-col items-center text-center w-full">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <img
                src="/images/conservation.png"
                alt="Conservation Tips"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-lg font-bold text-blue-800">
              {" "}
              Smart Conservation Tips
            </h3>
            <p className="mt-2 text-gray-700">
              Reduce water waste with AI-driven conservation suggestions
              tailored to your household's habits.
            </p>
          </div>

          {/* 📥 Data-Driven Budget Planning */}
          <div className="p-6  rounded-lg transition-all transform hover:scale-105 flex flex-col items-center text-center w-full">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <img
                src="/images/budget.png"
                alt="Budget Planning"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-lg font-bold text-blue-800">
              {" "}
              Data-Driven Budget Planning
            </h3>
            <p className="mt-2 text-gray-700">
              Plan ahead and track your expenses with monthly usage reports and
              spending insights.
            </p>
          </div>
        </div>
      </div>

      {/* 🎮 Water Pollution Fighting Game Section */}
      <div className="w-screen bg-gradient-to-br from-blue-900 via-blue-650 to-blue-400 py-16 px-6 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-white text-center mb-4">
          Water Pollution Fighting Game
        </h2>
        <p className="text-white text-lg text-center max-w-3xl">
          Aqua Quest isn’t just about water bill predictions—it’s also a fun and
          interactive way to learn about water conservation! Our game mode turns
          environmental awareness into an exciting challenge where players
          battle against pollution monsters that threaten clean water sources.
        </p>
        <p className="text-white text-lg text-center max-w-3xl mt-4">
          As you progress through different levels, you’ll gain knowledge about
          real-world water pollution issues, learn practical conservation tips,
          and earn rewards for making eco-friendly choices. Experience the
          thrill of saving the planet while having fun!
        </p>
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
