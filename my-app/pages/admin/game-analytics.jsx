import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Trophy } from "lucide-react";
import AdminLayout from "/pages/admin/layout";

const playerEngagementData = [
  { date: "Feb 1", players: 120 },
  { date: "Feb 2", players: 135 },
  { date: "Feb 3", players: 150 },
  { date: "Feb 4", players: 180 },
  { date: "Feb 5", players: 210 },
  { date: "Feb 6", players: 250 },
  { date: "Feb 7", players: 300 },
];

const leaderboardData = [
  { id: 1, name: "John Doe", score: 1500, level: 10, achievements: "🏆🎖️" },
  { id: 2, name: "Jane Smith", score: 1450, level: 9, achievements: "🏅🎖️" },
  { id: 3, name: "Michael Brown", score: 1350, level: 8, achievements: "🎖️" },
  { id: 4, name: "Emily Johnson", score: 1250, level: 7, achievements: "🏅" },
  { id: 5, name: "Daniel Wilson", score: 1150, level: 6, achievements: "🏆" },
];

export default function GameAnalytics() {
  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-8 rounded-lg shadow-lg mb-8 text-center animate-fade-in">
          <h1 className="text-5xl font-extrabold tracking-wide"> Game Analytics</h1>
          <p className="mt-2 text-lg opacity-80">Track player activity and leaderboard rankings.</p>
        </div>

        {/* Player Engagement Graph */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 transition duration-300 hover:shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-blue-900"> Player Engagement Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={playerEngagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="players" stroke="#4F46E5" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-yellow-600"> Leaderboard</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white text-sm uppercase">
                <th className="px-6 py-3">Rank</th>
                <th className="px-6 py-3">Player</th>
                <th className="px-6 py-3">Score</th>
                <th className="px-6 py-3">Level</th>
                <th className="px-6 py-3">Achievements</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player, index) => (
                <tr
                  key={player.id}
                  className={`border-b text-center ${
                    index === 0 ? "bg-yellow-100 font-bold" : "hover:bg-gray-100"
                  } transition duration-200`}
                >
                  <td className="px-6 py-4 text-lg">{index + 1}</td>
                  <td className="px-6 py-4 flex items-center gap-2 justify-center">
                    <Trophy size={18} className={index === 0 ? "text-yellow-500" : "text-gray-500"} />
                    {player.name}
                  </td>
                  <td className="px-6 py-4">{player.score}</td>
                  <td className="px-6 py-4">{player.level}</td>
                  <td className="px-6 py-4 text-lg">{player.achievements}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
