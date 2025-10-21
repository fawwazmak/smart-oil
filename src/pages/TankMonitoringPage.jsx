import React from "react";
import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
} from "recharts";



const TankMonitoringPage = () => {
  const tankData = [
    { name: "Station A", level: 2160, coords: "top-12 left-20" },
    { name: "Station B", level: 1780, coords: "top-36 left-1/2" },
    { name: "Station C", level: 2110, coords: "bottom-20 right-32" },
    { name: "Station D", level: 1890, coords: "bottom-10 left-10" },
  ];
  return (
    <div className="min-h-screen bg-[#101624] text-white p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-white">Tank Monitoring</h1>

      {/* Map Visualization */}
      <div className="bg-[#151b29] p-6 rounded-2xl shadow-lg mb-8 relative overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 text-white">Station Map Overview</h2>
        <div className="relative h-[400px] bg-[#191f2d] rounded-xl border border-[#2b313f] overflow-hidden">
          {/* Grid lines to simulate map */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2b313f_1px,transparent_1px),linear-gradient(to_bottom,#2b313f_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

          {tankData.map((station, i) => (
            <div
              key={i}
              className={`absolute ${station.coords} flex flex-col items-center`}
            >
              {/* Tank bubble indicator */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-[#183e51] bg-[#183e51]/20 shadow-[0_0_12px_#183e51]"></div>
                <span className="text-sm font-bold text-white">
                  {Math.round((station.level / 2500) * 100)}%
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-300">{station.name}</div>
              <div className="text-xs text-white">{station.level} L</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-[#151b29] p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Tank Level Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tankData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2b313f" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="level" fill="#183e51" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TankMonitoringPage;