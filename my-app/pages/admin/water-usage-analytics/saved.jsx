import React, { useEffect, useState } from "react";
import AdminLayout from "/pages/admin/layout";
import TotalMoneySavedOverTimeChart from "../../components/TotalMoneySavedOverTimeChart";

export default function TotalMoneySaved() {
  const [totalMoneySavedOverTime, setTotalMoneySavedOverTime] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    fetch(
      "https://aqua-quest-backend-deployment.onrender.com/api/admin/total-money-saved-over-time"
    )
      .then((response) => response.json())
      .then((data) => setTotalMoneySavedOverTime(data))
      .catch((error) =>
        console.error("Error fetching total money saved over time data:", error)
      );
  }, []);

  useEffect(() => {
    fetch(
      "https://aqua-quest-backend-deployment.onrender.com/api/admin/top-users-with-most-saved-money"
    )
      .then((response) => response.json())
      .then((data) => setTopUsers(data))
      .catch((error) =>
        console.error("Error fetching top users with most saved money:", error)
      );
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Total Money Saved Over Time</h1>
        <hr className="my-6 border-t-2 border-gray-300" />
        <div className="flex flex-wrap mb-6">
          <div className="w-full lg:w-2/3 p-4">
            <TotalMoneySavedOverTimeChart
              totalMoneySavedOverTime={totalMoneySavedOverTime}
            />
          </div>
          <div className="w-full lg:w-1/3 p-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                Top 10 Users with Most Saved Money
              </h2>
              <ul className="space-y-4">
                {topUsers.map((user) => (
                  <li key={user.userId} className="flex justify-between">
                    <span>{user.userName}</span>
                    <span>₱{user.totalSavedCost.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
