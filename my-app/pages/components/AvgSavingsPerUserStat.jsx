import React from 'react';
import { TrendingUp } from 'lucide-react';
import StatCard from './StatCard';

function AvgSavingsPerUserStat({ avgSavingsPerUser }) {
  return (
    <StatCard
      title="Avg Savings per User"
      value={`₱${avgSavingsPerUser ?? "Loading..."}`}
      iconBg="bg-blue-500"
      icon={<TrendingUp size={32} />}
    />
  );
}

export default AvgSavingsPerUserStat;