import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ScatterPlotInventory = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="Woins" name="Woins" />
            <YAxis type="number" dataKey="InventorySize" name="Inventory Size" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Players" data={data} fill="#8884d8" />
        </ScatterChart>
    </ResponsiveContainer>
);

export default ScatterPlotInventory;