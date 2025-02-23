import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "/pages/admin/layout";
import { User, DollarSign, FileText, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,200",
    iconBg: "from-blue-500 to-blue-700",
    icon: <User size={32} />,
  },
  {
    title: "Total Money Saved",
    value: "₱50,000",
    iconBg: "from-green-500 to-green-700",
    icon: <DollarSign size={32} />,
  },
  {
    title: "Total Bills Uploaded",
    value: "3,500",
    iconBg: "from-yellow-500 to-yellow-700",
    icon: <FileText size={32} />,
  },
  {
    title: "Avg Savings per User",
    value: "₱41.67",
    iconBg: "from-purple-500 to-purple-700",
    icon: <TrendingUp size={32} />,
  },
];

const waterBillData = [
  { month: "Jan", amount: 1500 },
  { month: "Feb", amount: 1800 },
  { month: "Mar", amount: 1700 },
  { month: "Apr", amount: 2000 },
  { month: "May", amount: 2200 },
  { month: "Jun", amount: 2500 },
];

const savingsData = [
  { month: "Jan", savings: 5000 },
  { month: "Feb", savings: 7000 },
  { month: "Mar", savings: 6500 },
  { month: "Apr", savings: 8000 },
  { month: "May", savings: 9000 },
  { month: "Jun", savings: 10000 },
];

const billCategories = [
  { name: "Low (₱0-₱1,500)", value: 30 },
  { name: "Medium (₱1,500-₱2,500)", value: 50 },
  { name: "High (₱2,500+)", value: 20 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
        {" "}
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            iconBg={stat.iconBg}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Uploads Graph */}
        <ChartCard title="Total Water Bill Uploads">
          <BarChart data={waterBillData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.3)" />
            <XAxis dataKey="month" tick={{ fill: "black" }} />
            <YAxis tick={{ fill: "black" }} />
            <Tooltip />
            <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
              {waterBillData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    [
                      "#1F2937",
                      "#3B82F6",
                      "#10B981",
                      "#F59E0B",
                      "#EF4444",
                      "#8B5CF6",
                    ][index % 6]
                  } // Rotating colors
                />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>

        {/* Money Saved Graph */}
        <ChartCard title=" Total Money Saved Over Time">
          <LineChart data={savingsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.3)" />
            <XAxis dataKey="month" tick={{ fill: "black" }} />
            <YAxis tick={{ fill: "black" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="savings"
              stroke="#1F2937"
              strokeWidth={3}
            />
          </LineChart>
        </ChartCard>
      </div>

      {/* More Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Area Chart */}
        <ChartCard title=" Water Bill Trend">
          <AreaChart data={waterBillData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.3)" />
            <XAxis dataKey="month" tick={{ fill: "black" }} />
            <YAxis tick={{ fill: "black" }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#1F2937"
              fill="#818CF8"
            />
          </AreaChart>
        </ChartCard>

        {/* Pie Chart */}
        <ChartCard title=" Water Bill Categories">
          <PieChart>
            <Pie
              data={billCategories}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
            >
              {billCategories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>
      </div>
    </AdminLayout>
  );
}

// ✨ Modern Stat Card
function StatCard({ title, value, iconBg, icon }) {
  return (
    <div className="p-6 rounded-xl shadow-lg flex items-center gap-4 bg-gradient-to-r hover:scale-105 transition-all text-white from-gray-700 to-gray-800">
      <div
        className={`p-4 rounded-lg bg-gradient-to-r ${iconBg} text-white shadow-md`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}

// 📊 Modern Chart Card
function ChartCard({ title, children }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-lg shadow-lg text-black">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}
