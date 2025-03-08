import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import ChartCard from "./ChartCard";

const BLUE_SHADES = ["#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

function TotalWaterBillUploadsChart({ waterBillData }) {
  return (
    <ChartCard
      title="Total Water Bill Uploads"
      description="This bar chart displays the number of water bills uploaded each month. It helps track user activity and document submission trends."
    >
      <BarChart
        data={Array.isArray(waterBillData) ? waterBillData : []}
        barSize={40}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.3)" />
        <XAxis dataKey="label" tick={{ fill: "black" }} />
        <YAxis tick={{ fill: "black" }} />
        <Tooltip />
        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
          {Array.isArray(waterBillData)
            ? waterBillData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={BLUE_SHADES[index % BLUE_SHADES.length]}
                />
              ))
            : null}
        </Bar>
      </BarChart>
    </ChartCard>
  );
}

export default TotalWaterBillUploadsChart;
