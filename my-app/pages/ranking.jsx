import React, { useState } from "react";
import { Crown, Trophy } from "lucide-react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const categories = ["Money Saved", "Game Fights", "Power Level"];

const playersData = {
  "Money Saved": [
    { name: "OceanMaster", email: "oceanmaster@example.com", score: 5000, avatar: "🌊" },
    { name: "CoralKing", email: "coralking@example.com", score: 4700, avatar: "🐠" },
    { name: "DeepDiver", email: "deepdiver@example.com", score: 4200, avatar: "🤿" },
    { name: "WaveWarrior", email: "wavewarrior@example.com", score: 3900, avatar: "⚓" },
    { name: "SeaSurfer", email: "seasurfer@example.com", score: 3500, avatar: "🏄‍♂️" },
    { name: "TideMaster", email: "tidemaster@example.com", score: 3200, avatar: "🌪️" },
    { name: "AquaKnight", email: "aquaknight@example.com", score: 2800, avatar: "🛡️" },
    { name: "StormRider", email: "stormrider@example.com", score: 2500, avatar: "🌊" },
    { name: "Poseidon'sHeir", email: "poseidonheir@example.com", score: 2300, avatar: "🔱" },
    { name: "AbyssWalker", email: "abysswalker@example.com", score: 2100, avatar: "🐙" },
  ],
  "Game Fights": [
    { name: "WaveWarrior", email: "wavewarrior@example.com", score: 100, avatar: "⚓" },
    { name: "SeaSurfer", email: "seasurfer@example.com", score: 95, avatar: "🏄‍♂️" },
    { name: "DeepDiver", email: "deepdiver@example.com", score: 90, avatar: "🤿" },
    { name: "TideMaster", email: "tidemaster@example.com", score: 85, avatar: "🌪️" },
    { name: "StormRider", email: "stormrider@example.com", score: 80, avatar: "🌊" },
    { name: "AquaKnight", email: "aquaknight@example.com", score: 78, avatar: "🛡️" },
    { name: "Poseidon'sHeir", email: "poseidonheir@example.com", score: 74, avatar: "🔱" },
    { name: "AbyssWalker", email: "abysswalker@example.com", score: 72, avatar: "🐙" },
    { name: "CoralKing", email: "coralking@example.com", score: 70, avatar: "🐠" },
    { name: "OceanMaster", email: "oceanmaster@example.com", score: 68, avatar: "🌊" },
  ],
  "Power Level": [
    { name: "CoralKing", email: "coralking@example.com", score: 9200, avatar: "🐠" },
    { name: "OceanMaster", email: "oceanmaster@example.com", score: 9000, avatar: "🌊" },
    { name: "WaveWarrior", email: "wavewarrior@example.com", score: 8700, avatar: "⚓" },
    { name: "DeepDiver", email: "deepdiver@example.com", score: 8500, avatar: "🤿" },
    { name: "SeaSurfer", email: "seasurfer@example.com", score: 8300, avatar: "🏄‍♂️" },
    { name: "TideMaster", email: "tidemaster@example.com", score: 8000, avatar: "🌪️" },
    { name: "StormRider", email: "stormrider@example.com", score: 7700, avatar: "🌊" },
    { name: "AquaKnight", email: "aquaknight@example.com", score: 7500, avatar: "🛡️" },
    { name: "Poseidon'sHeir", email: "poseidonheir@example.com", score: 7200, avatar: "🔱" },
    { name: "AbyssWalker", email: "abysswalker@example.com", score: 7000, avatar: "🐙" },
  ],
};

export default function Ranking() {
  const [selectedCategory, setSelectedCategory] = useState("Money Saved");
  const players = playersData[selectedCategory];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 flex flex-col items-center p-6 text-black relative overflow-hidden">
        {/* Background Waves */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/wave-pattern.svg')] bg-cover opacity-10"></div>

        <h1 className="text-4xl font-extrabold mb-6 relative z-10 flex items-center gap-2">
          <Trophy size={40} className="text-yellow-500" /> Aqua Quest Rankings
        </h1>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-4 relative z-10 flex-wrap justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Rankings Table */}
        <div className="bg-gray-200 bg-opacity-70 p-6 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-5xl relative z-10 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-3 text-center">{selectedCategory}</h2>
          <table className="w-full text-center">
            <thead>
              <tr className="text-lg font-bold border-b border-gray-400 text-gray-800">
                <th className="p-3 w-1/6">Rank</th>
                <th className="p-3 w-1/6">Avatar</th>
                <th className="p-3 w-1/4 text-left">Player</th>
                <th className="p-3 w-1/4">Email</th>
                <th className="p-3 w-1/6">Score</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index} className="text-lg font-medium hover:bg-blue-500 hover:text-white transition-all">
                  <td className="p-3 text-center">
                    {index === 0 ? <Crown size={24} className="text-yellow-500 mx-auto" /> : `#${index + 1}`}
                  </td>
                  <td className="p-3 text-center text-2xl">{player.avatar}</td>
                  <td className="p-3 text-left">{player.name}</td>
                  <td className="p-3">{player.email}</td>
                  <td className="p-3 font-bold text-blue-800">{player.score.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
