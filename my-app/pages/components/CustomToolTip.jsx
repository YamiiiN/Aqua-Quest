import React from "react";

function CustomTooltip({ active, payload }) {
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
}

export default CustomTooltip;
