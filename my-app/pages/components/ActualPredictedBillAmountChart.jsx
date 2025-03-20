import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import ChartCard from "./ChartCard"; // Import the ChartCard component

const ActualPredictedBillAmountChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://aqua-quest-backend-deployment.onrender.com/api/admin/compare-amount",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        console.log("API Response:", result); // Log the API response for debugging
        if (result.success) {
          setChartData(result.data);
        } else {
          console.error("Failed to fetch data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching comparison data:", error);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded">
          <p className="label">{`Month: ${label}`}</p>
          <p className="intro">{`User: ${payload[0].payload.userName}`}</p>
          <p className="actual">{`Actual Bill Amount: ${payload[0].value.toFixed(2)}`}</p>
          <p className="predicted">{`Predicted Bill Amount: ${payload[1].value.toFixed(2)}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ChartCard
      title="Actual vs Predicted Bill Amount"
      description="This chart compares the actual bill amount with the predicted bill amount for each month. The data helps in understanding the accuracy of the predictions and identifying any discrepancies."
    >
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tickFormatter={(tick) => `${tick}`} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="actualAmount" fill="#1E3A8A" name="Actual Bill Amount" />
        <Bar
          dataKey="predictedAmount"
          fill="#60A5FA"
          name="Predicted Bill Amount"
        />
      </BarChart>
    </ChartCard>
  );
};

export default ActualPredictedBillAmountChart;