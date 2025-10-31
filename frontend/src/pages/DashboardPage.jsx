import React from 'react'
import DashboardCard from '../components/DashboardCard';
import {
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
BarChart,
Bar,
ResponsiveContainer,
} from "recharts";

const DashboardPage = () => {
    const systemData = [
        { name: "Mon", uptime: 98.5 },
        { name: "Tue", uptime: 99.1 },
        { name: "Wed", uptime: 99.4 },
        { name: "Thu", uptime: 99.8 },
        { name: "Fri", uptime: 99.9 },
        { name: "Sat", uptime: 99.7 },
        { name: "Sun", uptime: 99.9 },
    ];

    const inventoryData = [
        { name: "Station A", level: 2160 },
        { name: "Station B", level: 1780 },
        { name: "Station C", level: 2110 },
        { name: "Station D", level: 2310 },
        { name: "Station E", level: 2010 },
        { name: "Station F", level: 2510 },
        { name: "Station G", level: 2100 },
        { name: "Station H", level: 3010 },
    ];
  return (
    <div className='bg-[#101624] p-4'>
        <h1 className='text-white md:text-4xl text-3xl'>Dashboard</h1>

        <div className='flex md:flex-row flex-col md:space-x-6 md:space-y-0 space-y-4 my-8 justify-between'>
            <DashboardCard title="Tank Monitored" value={9.829} unit="Ltr" />
            <DashboardCard title="External Ship" value={"Connected"} />
            <DashboardCard title="System Monitor" value={99.9} unit="%" />
        </div>

        {/* System Performance Chart */}
        <div className="bg-[#151b29] p-6 rounded-2xl shadow-lg">
            {/* <h2 className="text-xl font-semibold mb-4 text-[#CBA244]">
                System Performance (Uptime %)
            </h2> */}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={systemData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2b313f" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis domain={[98, 100]} stroke="#ccc" />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="uptime"
                    stroke="#183e51"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                />
                </LineChart>
            </ResponsiveContainer>
        </div>

        <div className="bg-[#151b29] p-6 rounded-2xl shadow-lg my-12">
            <h2 className="text-xl font-semibold mb-4 text-white">
                Inventory Overview (Litres)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2b313f" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="level" fill="#183e51" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}


export default DashboardPage
