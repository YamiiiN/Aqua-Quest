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
  const BLUE_SHADES = ["#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, billsRes, billDataRes, categoriesRes, consumptionRes] =
          await Promise.all([
            fetch(
              "https://aqua-quest-backend-deployment.onrender.com/api/admin/total-users"
            ),
            fetch(
              "https://aqua-quest-backend-deployment.onrender.com/api/admin/total-waterbills"
            ),
            fetch(
              "https://aqua-quest-backend-deployment.onrender.com/api/admin/total-waterbills-monthly"
            ),
            fetch(
              "http://localhost:5000/api/admin/water-bill-categories"
            ),
            fetch(
              "https://aqua-quest-backend-deployment.onrender.com/api/admin/water-consumption-trend"
            ),
          ]);

        if (!billDataRes.ok) throw new Error(`HTTP ${billDataRes.status}`);
        if (!consumptionRes.ok)
          throw new Error(`HTTP ${consumptionRes.status}`);

        const waterBillDataJson = await billDataRes.json();
        const waterConsumptionDataJson = await consumptionRes.json();

        // Ensure waterBillData is an array before setting state
        setWaterBillData(
          Array.isArray(waterBillDataJson) ? waterBillDataJson : []
        );
        setWaterConsumptionData(
          Array.isArray(waterConsumptionDataJson)
            ? waterConsumptionDataJson
            : []
        );

        setTotalUsers((await usersRes.json()).totalUsers);
        setTotalWaterBills((await billsRes.json()).totalWaterBills);
        setBillCategories(await categoriesRes.json());
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: totalUsers ?? "Loading...",
      iconBg: "bg-blue-800", // Medium blue
      icon: <User size={32} />,
    },
    {
      title: "Total Money Saved",
      value: "₱50,000",
      iconBg: "bg-blue-700", // Dark slate for contrast
      icon: <DollarSign size={32} />,
    },
    {
      title: "Total Bills Uploaded",
      value: totalWaterBills ?? "Loading...",
      iconBg: "bg-blue-600", // Lighter blue
      icon: <FileText size={32} />,
    },
    {
      title: "Avg Savings per User",
      value: "₱41.67",
      iconBg: "bg-blue-500", // Dark gray for variety
      icon: <TrendingUp size={32} />,
    },
  ];

  return (
    <AdminLayout>
      <div className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-8 rounded-lg shadow-lg mb-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-lg opacity-80">
          Gain insights into user activity, game performance, and leaderboard
          rankings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartCard
          title="Total Water Bill Uploads"
          description="This bar chart displays the number of water bills uploaded each month. It helps track user activity and document submission trends."
        >
          <BarChart
            data={Array.isArray(waterBillData) ? waterBillData : []}
            barSize={40}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.3)" />
            <XAxis dataKey="label" tick={{ fill: "black" }} />
            <YAxis tick={{ fill: "black" }} />
            <Tooltip />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {Array.isArray(waterBillData)
                ? waterBillData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={BLUE_SHADES[index % BLUE_SHADES.length]}
                    />
                  ))
                : null}
            </Bar>
          </BarChart>
        </ChartCard>

        <ChartCard
          title="Total Money Saved Over Time"
          description="This line chart illustrates the total amount of money saved by users over time. It highlights cost reductions based on efficient water usage."
        >
          <LineChart data={waterConsumptionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.3)" />
            <XAxis dataKey="month" tick={{ fill: "black" }} />
            <YAxis tick={{ fill: "black" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2563EB"
              strokeWidth={3}
            />
          </LineChart>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
        {/* Water Consumption Trend - Wider (Spans 2 Columns) */}
        <div className="md:col-span-3">
          <ChartCard
            title="Water Consumption Trend"
            description="This area chart shows the average water consumption of users over time. It compares total bills uploaded against the average water usage."
          >
            <AreaChart data={waterConsumptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.3)" />
              <XAxis dataKey="month" tick={{ fill: "black" }} />
              <YAxis tick={{ fill: "black" }} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "averageConsumption")
                    return [`${value.toFixed(2)} m³`, "Avg Consumption"];
                  if (name === "totalBills")
                    return [`${value} bills`, "Total Bills"];
                  return value;
                }}
              />
              <Area
                type="monotone"
                dataKey="averageConsumption"
                stroke="#60A5FA"
                fill="url(#avgConsumptionGradient)"
              />
              <Area
                type="monotone"
                dataKey="totalBills"
                stroke="#1E3A8A"
                fill="url(#totalBillsGradient)"
              />
              {/* Define gradients */}
              <defs>
                <linearGradient
                  id="avgConsumptionGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#93C5FD" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#93C5FD" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient
                  id="totalBillsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0.2} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ChartCard>
        </div>

        {/* Water Bill Categories - Shorter (Spans 1 Column) */}
        <div className="md:col-span-2">
          <ChartCard
            title="Water Bill Categories"
            description="This pie chart categorizes water bills based on different bill amounts, ranging from low to high."
          >
            <PieChart width={300} height={300}>
              {" "}
              {/* Increased size */}
              <Pie
                data={billCategories}
                dataKey="value"
                nameKey="name"
                outerRadius={120} // Increased from 80 to 120
              >
                {billCategories.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={BLUE_SHADES[index % BLUE_SHADES.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartCard>
        </div>
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
 