import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "./ChartCard";

const COLORS = ["#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA"];

function PlayerKillStatsChart() {
  const [killStatsData, setKillStatsData] = useState([]);

  useEffect(() => {
    fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/kills")
      .then((response) => response.json())
      .then((data) => setKillStatsData(data))
      .catch((error) =>
        console.error("Error fetching player kill stats:", error)
      );
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
          <p className="label font-bold">{label}</p>
          <p className="intro">Kanal Goblin Kills: {data.kanalGoblinKills}</p>
          <p className="intro">El Niño Kills: {data.elNinoKills}</p>
          <p className="intro">Pinsalang Kinamada Kills: {data.pinsalangKinamadaKills}</p>
          <p className="intro font-bold">Overall Kills: {data.overallKills}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ChartCard
      title="Player Kill Stats"
      description="This bar chart shows the number of kills by players for different categories."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={killStatsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="playerName" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="kanalGoblinKills" stackId="a" fill={COLORS[0]} />
          <Bar dataKey="elNinoKills" stackId="a" fill={COLORS[1]} />
          <Bar dataKey="pinsalangKinamadaKills" stackId="a" fill={COLORS[2]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default PlayerKillStatsChart;