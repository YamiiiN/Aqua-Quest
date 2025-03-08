import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function PlayerEngagementChart({ playerEngagementData }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-3xl font-bold mb-4 text-blue-900">Player Engagement Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={playerEngagementData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="players" stroke="#4F46E5" strokeWidth={3} dot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PlayerEngagementChart;