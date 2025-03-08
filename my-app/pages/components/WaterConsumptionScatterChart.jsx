import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Average Water Consumption per User
      </h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
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
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WaterConsumptionScatterChart;