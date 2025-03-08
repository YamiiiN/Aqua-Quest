import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import ChartCard from "./ChartCard";

const BLUE_SHADES = ["#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

function WaterConsumptionTrendChart({ waterConsumptionData }) {
  return (
    <ChartCard
      title="Water Consumption Trend"
      description="This area chart shows the average water consumption of users over time. It compares total bills uploaded against the average water usage."
    >
      <AreaChart data={waterConsumptionData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.3)" />
        <XAxis dataKey="month" tick={{ fill: "black" }} />
        <YAxis tick={{ fill: "black" }} />
        <Tooltip
          formatter={(value, name) => {
            if (name === "averageConsumption")
              return [`${value.toFixed(2)} m³`, "Avg Consumption"];
            if (name === "totalBills") return [`${value} bills`, "Total Bills"];
            return value;
          }}
        />
        <Area
          type="monotone"
          dataKey="averageConsumption"
          stroke="#60A5FA"
          fill="url(#avgConsumptionGradient)"
        />
        <Area
          type="monotone"
          dataKey="totalBills"
          stroke="#1E3A8A"
          fill="url(#totalBillsGradient)"
        />
        <defs>
          <linearGradient
            id="avgConsumptionGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="5%" stopColor="#93C5FD" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#93C5FD" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="totalBillsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0.2} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ChartCard>
  );
}

export default WaterConsumptionTrendChart;
