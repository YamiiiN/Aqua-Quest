import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartCard from '../components/ChartCard'; // Adjust the import path as necessary

const RadarChartInventory = ({ data }) => (
  <ChartCard title="Player Strength Based on Inventory" description="This radar chart shows the strength of players based on their inventory of relics and potions.">
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data} width={500} height={500}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Tooltip />
        <Radar name="Relics" dataKey="Relics" stroke="#1E3A8A" fill="#3B82F6" fillOpacity={0.6} />
        <Radar name="Potions" dataKey="Potions" stroke="#3B82F6" fill="#1E3A8A" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  </ChartCard>
);

export default RadarChartInventory;