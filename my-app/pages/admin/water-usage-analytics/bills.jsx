import React, { useEffect, useState } from "react";
import AdminLayout from "/pages/admin/layout";
import WaterConsumptionTrend from "../../components/WaterConsumptionTrendChart";
import WaterBillCategoriesChart from "../../components/WaterBillCategoriesChart";
import TotalWaterBillUploads from "../../components/TotalWaterBillUploadsChart";
import WaterConsumptionScatterChart from "../../components/WaterConsumptionScatterChart";

export default function WaterUsageAnalytics() {
  const [waterConsumptionData, setWaterConsumptionData] = useState([]);
  const [waterBillCategoriesData, setWaterBillCategoriesData] = useState([]);
  const [totalWaterBillUploadsData, setTotalWaterBillUploadsData] = useState(
    []
  );
  const [scatterData, setScatterData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://aqua-quest-backend-deployment.onrender.com/api/admin/average-consumption"
        );
        const data = await response.json();
        setScatterData(data.scatterData);
      } catch (error) {
        console.error("Error fetching average consumption:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    fetch(
      "https://aqua-quest-backend-deployment.onrender.com/api/admin/water-consumption-trend"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Water Consumption Data:", data);
        setWaterConsumptionData(data);
      })
      .catch((error) =>
        console.error("Error fetching water consumption data:", error)
      );

    fetch(
      "https://aqua-quest-backend-deployment.onrender.com/api/admin/water-bill-categories"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Water Bill Categories Data:", data);
        setWaterBillCategoriesData(data);
      })
      .catch((error) =>
        console.error("Error fetching water bill categories data:", error)
      );

    fetch(
      "https://aqua-quest-backend-deployment.onrender.com/api/admin/total-waterbills-monthly"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Total Water Bill Uploads Data:", data);
        setTotalWaterBillUploadsData(data);
      })
      .catch((error) =>
        console.error("Error fetching total water bill uploads data:", error)
      );
  }, []);

  return (
    <AdminLayout>
      <div className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-8 rounded-lg shadow-lg mb-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide">
          Water Usage Analytics
        </h1>
        <p className="mt-2 text-lg opacity-80">
          Track water consumption and billing trends.
        </p>
      </div>
      <hr className="my-6 border-t-2 border-gray-300" />
      <div className="p-6 min-h-screen">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2">
            <WaterConsumptionTrend
              waterConsumptionData={waterConsumptionData}
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <WaterBillCategoriesChart
              billCategories={waterBillCategoriesData}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2">
            <WaterConsumptionScatterChart scatterData={scatterData} />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <TotalWaterBillUploads waterBillData={totalWaterBillUploadsData} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
