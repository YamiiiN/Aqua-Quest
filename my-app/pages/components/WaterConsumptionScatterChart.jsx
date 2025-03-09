import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from './ChartCard'; // Import the ChartCard component

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-white p-2 shadow-md rounded-md text-sm">
        <p className="font-bold">{dataPoint.name}</p>
        <p>Avg Consumption: {dataPoint.avgConsumption.toFixed(2)} L</p>
      </div>
    );
  }
  return null;
};

function WaterConsumptionScatterChart({ scatterData }) {
  return (
    <ChartCard 
      title="Average Water Consumption per User" 
      description="This chart shows the average water consumption per user. Each point represents a user, with the x-axis representing the user ID and the y-axis representing the average water consumption in liters."
    >
      <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="id"
          name="User ID"
          domain={["auto", "auto"]}
        />
        <YAxis
          type="number"
          dataKey="avgConsumption"
          name="Avg Consumption (L)"
          unit="L"
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ strokeDasharray: "3 3" }}
        />
        <Scatter name="Users" data={scatterData} fill="#2563EB" />
      </ScatterChart>
    </ChartCard>
  );
}

export default WaterConsumptionScatterChart;