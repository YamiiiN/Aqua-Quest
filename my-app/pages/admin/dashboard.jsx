import React, { useEffect, useState } from "react";
import AdminLayout from "/pages/admin/layout";
import TotalUsersStat from "../components/TotalUsersStat";
import TotalMoneySavedStat from "../components/TotalMoneySavedStat";
import TotalBillsUploadedStat from "../components/TotalBillsUploadedStat";
import AvgSavingsPerUserStat from "../components/AvgSavingsPerUserStat";
import TotalWaterBillUploadsChart from "../components/TotalWaterBillUploadsChart";
import TotalMoneySavedOverTimeChart from "../components/TotalMoneySavedOverTimeChart";
import WaterConsumptionTrendChart from "../components/WaterConsumptionTrendChart";
import RadarChartInventory from "../components/RadarChartInventory";
import PredictionAccuracyChart from "../components/PredictionAccuracyChart";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalWaterBills, setTotalWaterBills] = useState(null);
  const [totalSavedCost, setTotalSavedCost] = useState(null);
  const [avgSavingsPerUser, setAvgSavingsPerUser] = useState(null);
  const [waterBillData, setWaterBillData] = useState([]);
  const [billCategories, setBillCategories] = useState([]);
  const [waterConsumptionData, setWaterConsumptionData] = useState([]);
  const [totalMoneySavedOverTime, setTotalMoneySavedOverTime] = useState([]);
  const [predictionAccuracy, setPredictionAccuracy] = useState({
    correct: 0,
    overestimated: 0,
    underestimated: 0,
  });
  const [radarChartData, setRadarChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          usersRes,
          billsRes,
          savedCostRes,
          avgSavingsRes,
          billDataRes,
          categoriesRes,
          consumptionRes,
          moneySavedRes,
          predictionAccuracyRes,
          radarChartRes,
        ] = await Promise.all([
          fetch(
            "https://aqua-quest-backend-deployment.onrender.com/api/admin/total-users"
          ),
          fetch(
            "https://aqua-quest-backend-deployment.onrender.com/api/admin/total-waterbills"
          ),
          fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/total-saved-cost"),
          fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/avg-savings-per-user"),
          fetch(
            "https://aqua-quest-backend-deployment.onrender.com/api/admin/total-waterbills-monthly"
          ),
          fetch(
            "https://aqua-quest-backend-deployment.onrender.com/api/admin/water-bill-categories"
          ),
          fetch(
            "https://aqua-quest-backend-deployment.onrender.com/api/admin/water-consumption-trend"
          ),
          fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/total-money-saved-over-time"),
          fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/prediction-accuracy"),
          fetch("http://localhost:5000/api/admin/inventory-stats"), // Corrected URL for radar chart data
        ]);

        if (!billDataRes.ok) throw new Error(`HTTP ${billDataRes.status}`);
        if (!consumptionRes.ok) throw new Error(`HTTP ${consumptionRes.status}`);

        const waterBillDataJson = await billDataRes.json();
        const waterConsumptionDataJson = await consumptionRes.json();
        const totalMoneySavedOverTimeJson = await moneySavedRes.json();
        const predictionAccuracyJson = await predictionAccuracyRes.json();
        const radarChartDataJson = await radarChartRes.json();
        // Ensure waterBillData is an array before setting state
        setWaterBillData(
          Array.isArray(waterBillDataJson) ? waterBillDataJson : []
        );
        setWaterConsumptionData(
          Array.isArray(waterConsumptionDataJson)
            ? waterConsumptionDataJson
            : []
        );
        setTotalMoneySavedOverTime(
          Array.isArray(totalMoneySavedOverTimeJson)
            ? totalMoneySavedOverTimeJson
            : []
        );
        setPredictionAccuracy(predictionAccuracyJson);
        setRadarChartData(radarChartDataJson);
        setTotalUsers((await usersRes.json()).totalUsers);
        setTotalWaterBills((await billsRes.json()).totalWaterBills);
        setTotalSavedCost((await savedCostRes.json()).totalSavedCost);
        setAvgSavingsPerUser((await avgSavingsRes.json()).avgSavingsPerUser);
        setBillCategories(await categoriesRes.json());
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

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
      <hr className="my-6 border-t-2 border-gray-300" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TotalUsersStat totalUsers={totalUsers} />
        <TotalMoneySavedStat totalSavedCost={totalSavedCost} />
        <TotalBillsUploadedStat totalWaterBills={totalWaterBills} />
        <AvgSavingsPerUserStat avgSavingsPerUser={avgSavingsPerUser} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <div className="flex justify-between items-center">
            <a href="/bills" className="text-blue-500">See More...</a>
          </div>
          <WaterConsumptionTrendChart waterConsumptionData={waterConsumptionData} />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <a href="/inventory" className="text-blue-500">See More...</a>
          </div>
          <RadarChartInventory data={radarChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
        <div className="md:col-span-2">
          <div className="flex justify-between items-center">

            <a href="/predictions" className="text-blue-500">See More...</a>
          </div>
          <PredictionAccuracyChart data={predictionAccuracy} />
        </div>
        <div className="md:col-span-3">
          <div className="flex justify-between items-center">

            <a href="/saved" className="text-blue-500">See More...</a>
          </div>
          <TotalMoneySavedOverTimeChart totalMoneySavedOverTime={totalMoneySavedOverTime} />
        </div>
      </div>
    </AdminLayout>
  );
}