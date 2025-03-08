import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ChartCard from "./ChartCard";

const BLUE_SHADES = ["#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

function PredictionAccuracyChart({ data }) {
  const chartData = [
    { name: 'Correct', value: data.correct },
    { name: 'Overestimated', value: data.overestimated },
    { name: 'Underestimated', value: data.underestimated },
  ];

  return (
    <ChartCard
      title="Prediction Accuracy"
      description="This pie chart shows the accuracy of water consumption predictions, categorized as correct, overestimated, and underestimated."
    >
      <div className="h-80 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              labelLine={false}  
              outerRadius="70%"
              fill="#8884d8"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={BLUE_SHADES[index % BLUE_SHADES.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default PredictionAccuracyChart;