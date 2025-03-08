import React from 'react';
import { ResponsiveContainer } from 'recharts';

function ChartCard({ title, description, children }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-lg shadow-lg text-black">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

export default ChartCard;