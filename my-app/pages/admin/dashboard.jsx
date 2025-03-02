import React, { useEffect, useState } from "react";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalWaterBills, setTotalWaterBills] = useState(null);
  const [waterBillData, setWaterBillData] = useState([]);
  const [billCategories, setBillCategories] = useState([]);
  const [waterConsumptionData, setWaterConsumptionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, billsRes, billDataRes, categoriesRes, consumptionRes] =
          await Promise.all([
            fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/total-users"),
            fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/total-waterbills"),
            fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/total-waterbills-monthly"),
            fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/water-bill-categories"),
            fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/water-consumption-trend"),
          ]);

        setTotalUsers((await usersRes.json()).totalUsers);
        setTotalWaterBills((await billsRes.json()).totalWaterBills);
        setWaterBillData(await billDataRes.json());
        setBillCategories(await categoriesRes.json());
        setWaterConsumptionData(await consumptionRes.json());
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: totalUsers ?? "Loading...",
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
      value: totalWaterBills ?? "Loading...",
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

  return (
    <AdminLayout>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartCard title="Total Water Bill Uploads">
          <BarChart data={waterBillData} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.3)" />
            <XAxis dataKey="label" tick={{ fill: "black" }} />
            <YAxis tick={{ fill: "black" }} />
            <Tooltip />
            <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
              {waterBillData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>

        <ChartCard title="Total Money Saved Over Time">
          <LineChart data={waterConsumptionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.3)" />
            <XAxis dataKey="month" tick={{ fill: "black" }} />
            <YAxis tick={{ fill: "black" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#1F2937"
              strokeWidth={3}
            />
          </LineChart>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartCard title="Water Consumption Trend">
          <AreaChart data={waterConsumptionData}>
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

        <ChartCard title="Water Bill Categories">
          <PieChart>
            <Pie
              data={billCategories}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
            >
              {billCategories.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>
      </div>
    </AdminLayout>
  );
}

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
