import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import ChartCard from "./ChartCard";

function TotalMoneySavedOverTimeChart({ totalMoneySavedOverTime }) {
  return (
    <ChartCard
      title="Total Money Saved Over Time"
      description="This line chart illustrates the total amount of money saved by users over time. It highlights cost reductions based on efficient water usage."
    >
      <LineChart data={totalMoneySavedOverTime}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.3)" />
        <XAxis dataKey="month" tick={{ fill: "black" }} />
        <YAxis tick={{ fill: "black" }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="totalSavedCost"
          stroke="#2563EB"
          strokeWidth={3}
        />
      </LineChart>
    </ChartCard>
  );
}

export default TotalMoneySavedOverTimeChart;
