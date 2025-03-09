import React from "react";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, ZAxis, CartesianGrid } from "recharts";

const BubbleChartInventory = ({ data }) => {
    return (
        
            <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                    <CartesianGrid />
                        <XAxis type="category" dataKey="name" name="Player" />
                    <YAxis type="number" dataKey="Woins" name="Woins" />
                    <ZAxis type="number" dataKey="InventorySize" range={[100, 1000]} name="Inventory Size" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter name="Players" data={data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        
    );
};

export default BubbleChartInventory;
