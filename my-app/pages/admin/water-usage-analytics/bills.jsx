import React, { useEffect, useState } from 'react';
import AdminLayout from '/pages/admin/layout';
import WaterConsumptionTrend from '../../components/WaterConsumptionTrendChart';
import WaterBillCategoriesChart from '../../components/WaterBillCategoriesChart';
import TotalWaterBillUploads from '../../components/TotalWaterBillUploadsChart';

export default function WaterUsageAnalytics() {
  const [waterConsumptionData, setWaterConsumptionData] = useState([]);
  const [waterBillCategoriesData, setWaterBillCategoriesData] = useState([]);
  const [totalWaterBillUploadsData, setTotalWaterBillUploadsData] = useState([]);

  useEffect(() => {
    fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/water-consumption-trend")
      .then((response) => response.json())
      .then((data) => {
        console.log("Water Consumption Data:", data);
        setWaterConsumptionData(data);
      })
      .catch((error) => console.error("Error fetching water consumption data:", error));
    
    fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/water-bill-categories")
      .then((response) => response.json())
      .then((data) => {
        console.log("Water Bill Categories Data:", data);
        setWaterBillCategoriesData(data);
      })
      .catch((error) => console.error("Error fetching water bill categories data:", error));
    
    fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/total-waterbills-monthly")
      .then((response) => response.json())
      .then((data) => {
        console.log("Total Water Bill Uploads Data:", data);
        setTotalWaterBillUploadsData(data);
      })
      .catch((error) => console.error("Error fetching total water bill uploads data:", error));
  }, []);

  return (
    <AdminLayout>
      <div className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-8 rounded-lg shadow-lg mb-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide">Water Usage Analytics</h1>
        <p className="mt-2 text-lg opacity-80">
          Track water consumption and billing trends.
        </p>
      </div>

      <div className="p-6 min-h-screen">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2">
            <WaterConsumptionTrend waterConsumptionData={waterConsumptionData} />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <WaterBillCategoriesChart billCategories={waterBillCategoriesData} />
          </div>
        </div>
        <div className="mt-4">
          <TotalWaterBillUploads waterBillData={totalWaterBillUploadsData} />
        </div>
      </div>
    </AdminLayout>
  );
}