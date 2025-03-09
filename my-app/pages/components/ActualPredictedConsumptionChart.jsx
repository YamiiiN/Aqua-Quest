import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import ChartCard from './ChartCard'; // Import the ChartCard component

const ActualPredictedConsumptionChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/compare-consumption', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();
                console.log('API Response:', result); // Log the API response for debugging
                if (result.success) {
                    setChartData(result.data);
                } else {
                    console.error('Failed to fetch data:', result.message);
                }
            } catch (error) {
                console.error('Error fetching comparison data:', error);
            }
        };

        fetchData();
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded">
                    <p className="label">{`Month: ${label}`}</p>
                    <p className="intro">{`User: ${payload[0].payload.userName}`}</p>
                    <p className="actual">{`Actual Consumption: ${payload[0].value}`}</p>
                    <p className="predicted">{`Predicted Consumption: ${payload[1].value}`}</p>
                </div>
            );
        }
    
        return null;
    };
    return (
        <ChartCard 
            title="Actual vs Predicted Water Consumption" 
            description="This chart compares the actual water consumption with the predicted water consumption for each month. The data helps in understanding the accuracy of the predictions and identifying any discrepancies."
        >
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickFormatter={(tick) => `${tick}`} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="actualConsumption" fill="#1E3A8A" name="Actual Consumption" />
                <Bar dataKey="predictedConsumption" fill="#60A5FA" name="Predicted Consumption" />
            </BarChart>
        </ChartCard>
    );
};

export default ActualPredictedConsumptionChart;