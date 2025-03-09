import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ChartCard from '../components/ChartCard'; // Adjust the import path as necessary

const WoinsHistogram = ({ data }) => {
    const colors = ["#1E3A8A", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"];

    return (
      <ChartCard title="Woins Distribution Among Players" description="This chart shows the distribution of Woins among players, categorized into different ranges.">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default WoinsHistogram;