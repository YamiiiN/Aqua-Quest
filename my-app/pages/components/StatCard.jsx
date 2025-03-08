import React from 'react';

function StatCard({ title, value, iconBg, icon }) {
  return (
    <div className="p-6 rounded-xl shadow-lg flex items-center gap-4 bg-gradient-to-r hover:scale-105 transition-all text-white from-gray-700 to-gray-800">
      <div className={`p-4 rounded-lg bg-gradient-to-r ${iconBg} text-white shadow-md`}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;