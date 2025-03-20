// import React from 'react';
// import { DollarSign } from 'lucide-react';
// import StatCard from './StatCard';

// function TotalMoneySavedStat({ totalSavedCost }) {
//   return (
//     <StatCard
//       title="Total Money Saved"
//       value={`₱${totalSavedCost ?? "Loading..."}`}
//       iconBg="bg-blue-700"
//       icon={<DollarSign size={32} />}
//     />
//   );
// }

// export default TotalMoneySavedStat;
import React from 'react';
import StatCard from './StatCard';

// Custom Peso Sign Icon
const PesoSign = ({ size = 32 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-peso-sign"
  >
    <line x1="4" y1="10" x2="20" y2="10"></line>
    <line x1="4" y1="14" x2="20" y2="14"></line>
    <path d="M10 4h4a4 4 0 0 1 0 8h-4z"></path>
    <line x1="10" y1="4" x2="10" y2="20"></line>
  </svg>
);

function TotalMoneySavedStat({ totalSavedCost }) {
  return (
    <StatCard
      title="Total Money Saved"
      value={`₱${totalSavedCost ?? "Loading..."}`}
      iconBg="bg-blue-700"
      icon={<PesoSign size={32} />}
    />
  );
}

export default TotalMoneySavedStat;