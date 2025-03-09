import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import ChartCard from './ChartCard';

function PlayerEngagementChart({ playerEngagementData }) {
  return (
    <ChartCard
      title="Player Engagement Over Time"
      description="This line chart shows the engagement of players over time."
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={playerEngagementData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="players" stroke="#4F46E5" strokeWidth={3} dot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default PlayerEngagementChart;