import React from 'react';
import { User } from 'lucide-react';
import StatCard from './StatCard';

function TotalUsersStat({ totalUsers }) {
  return (
    <StatCard
      title="Total Users"
      value={totalUsers ?? "Loading..."}
      iconBg="bg-blue-800"
      icon={<User size={32} />}
    />
  );
}

export default TotalUsersStat;