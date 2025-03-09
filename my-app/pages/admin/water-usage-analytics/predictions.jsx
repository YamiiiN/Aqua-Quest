import React, { useEffect, useState } from 'react';
import AdminLayout from '/pages/admin/layout';
import PredictionAccuracyChart from '../../components/PredictionAccuracyChart';
import ActualPredictedConsumptionChart from '../../components/ActualPredictedConsumptionChart';
import ActualPredictedBillAmountChart from '../../components/ActualPredictedBillAmountChart';
import PredictionAccuracyCostChart from '../../components/PredictionAccuracyCostChart'; // Import the new component

export default function WaterUsagePredictions() {
  const [predictionAccuracy, setPredictionAccuracy] = useState({
    correct: 0,
    overestimated: 0,
    underestimated: 0,
  });

  useEffect(() => {
    fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/prediction-accuracy")
      .then((response) => response.json())
      .then((data) => setPredictionAccuracy(data))
      .catch((error) => console.error("Error fetching prediction accuracy data:", error));
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Water Usage Predictions</h1>
        <hr className="my-6 border-t-2 border-gray-300" />
        <div className="flex flex-wrap mb-6">
          <div className="w-full lg:w-3/4 p-4">
            
            <ActualPredictedConsumptionChart />
          </div>
          <div className="w-full lg:w-1/4 p-4">
          <PredictionAccuracyChart data={predictionAccuracy} />
          </div>
        </div>
        <div className="flex flex-wrap mb-6">
          <div className="w-full lg:w-1/4 p-4">
            <PredictionAccuracyCostChart />
          </div>
          <div className="w-full lg:w-3/4 p-4">
            <ActualPredictedBillAmountChart />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}