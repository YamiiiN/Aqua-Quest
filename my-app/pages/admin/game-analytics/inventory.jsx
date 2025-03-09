import React, { useEffect, useState } from "react";
import { Coins, FlaskConical, Gem } from "lucide-react";
import AdminLayout from "/pages/admin/layout"; // Adjust the import path as necessary
import StatCard from "../../components/StatCard"; // Adjust the import path as necessary
import InventoryTable from "../../components/InventoryTable"; // Adjust the import path as necessary
import RadarChartComponent from "../../components/RadarChartInventory"; // Adjust the import path as necessary
import WoinsHistogram from "../../components/WoinsHistogram"; // Adjust the import path as necessary

const PlayerInventoryPage = () => {
    const [stats, setStats] = useState({
        totalWoins: 0,
        totalRelics: 0,
        totalPotions: 0,
    });

    const [inventoryData, setInventoryData] = useState([]);
    const [radarData, setRadarData] = useState([]);
    const [woinsHistogramData, setWoinsHistogramData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const responses = await Promise.all([
                    fetch("http://localhost:5000/api/admin/total-woins"),
                    fetch("http://localhost:5000/api/admin/total-relics"),
                    fetch("http://localhost:5000/api/admin/total-potions"),
                    fetch("http://localhost:5000/api/admin/player-inventory"),
                    fetch("http://localhost:5000/api/admin/inventory-stats"),
                    fetch("http://localhost:5000/api/admin/woins-distribution"),
                ]);

                const data = await Promise.all(responses.map(res => res.json()));

                setStats({
                    totalWoins: data[0].totalWoins,
                    totalRelics: data[1].totalRelics,
                    totalPotions: data[2].totalPotions,
                });

                setInventoryData(data[3]);
                setRadarData(data[4]);
                setWoinsHistogramData(data[5]);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch data.");
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const handleSort = (key) => {
        const order = sortBy === key && sortOrder === "asc" ? "desc" : "asc";
        setSortBy(key);
        setSortOrder(order);

        const sortedData = [...inventoryData].sort((a, b) => {
            if (a[key] < b[key]) return order === "asc" ? -1 : 1;
            if (a[key] > b[key]) return order === "asc" ? 1 : -1;
            return 0;
        });

        setInventoryData(sortedData);
    };

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Player Inventory Stats</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Woins"
                        value={stats.totalWoins}
                        iconBg="bg-blue-900"
                        icon={<Coins className="text-white" size={40} />}
                    />
                    <StatCard
                        title="Total Relics"
                        value={stats.totalRelics}
                        iconBg="bg-blue-800"
                        icon={<Gem className="text-white" size={40} />}
                    />
                    <StatCard
                        title="Total Potions"
                        value={stats.totalPotions}
                        iconBg="bg-blue-700"
                        icon={<FlaskConical className="text-white" size={40} />}
                    />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <RadarChartComponent data={radarData} />
                    <WoinsHistogram data={woinsHistogramData} />
                </div>

                {/* Inventory Table */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Player Inventory List</h3>
                    <InventoryTable
                        inventoryData={inventoryData}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        handleSort={handleSort}
                    />
                </div>
            </div>
        </AdminLayout>
    );
};

export default PlayerInventoryPage;