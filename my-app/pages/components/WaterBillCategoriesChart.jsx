import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ChartCard from "./ChartCard";

const BLUE_SHADES = ["#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

function WaterBillCategoriesChart({ billCategories }) {
  return (
    <ChartCard
      title="Water Bill Categories"
      description="This pie chart categorizes water bills based on different bill amounts, ranging from low to high."
    >
      <div className="h-80 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={billCategories}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius="70%" // Adjust the outer radius to fit within the container
              fill="#8884d8"
            >
              {billCategories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={BLUE_SHADES[index % BLUE_SHADES.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default WaterBillCategoriesChart;