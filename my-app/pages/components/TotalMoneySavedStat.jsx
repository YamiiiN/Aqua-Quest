import React from 'react';
import { DollarSign } from 'lucide-react';
import StatCard from './StatCard';

function TotalMoneySavedStat({ totalSavedCost }) {
  return (
    <StatCard
      title="Total Money Saved"
      value={`₱${totalSavedCost ?? "Loading..."}`}
      iconBg="bg-blue-700"
      icon={<DollarSign size={32} />}
    />
  );
}

export default TotalMoneySavedStat;