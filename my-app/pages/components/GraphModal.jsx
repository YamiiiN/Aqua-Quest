// filepath: c:\Users\Danniel\Documents\GitHub\Aqua-Quest\my-app\pages\components\GraphModal.jsx
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const BLUE_SHADES = ["#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

function GraphModal({
  isGraphModalOpen,
  closeGraphModal,
  barChartData,
  lineChartData,
}) {
  if (!isGraphModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-[800px]">
        <h2 className="text-2xl font-bold mb-6">User Water Bill Data</h2>
        {barChartData.length > 0 && lineChartData.length > 0 ? (
          <>
            <div className="h-64 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount">
                    {barChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={BLUE_SHADES[index % BLUE_SHADES.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <h2 className="text-2xl font-bold mb-6">Consumption Trends</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="consumption"
                    stroke="#2563EB"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            No water bill data available for this user.
          </div>
        )}
        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
            onClick={closeGraphModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default GraphModal;
