import React, { useState } from "react";
import {
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer,
} from "recharts";



const ForecastingPage = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Restock premium within 8 days - consumption are increasing by thel." },
  ]);
  const [input, setInput] = useState("");
  const forecastData = [
    { day: "Mon", usage: 2100, forecast: 2200 },
    { day: "Tue", usage: 2150, forecast: 2250 },
    { day: "Wed", usage: 2200, forecast: 2320 },
    { day: "Thu", usage: 2300, forecast: 2400 },
    { day: "Fri", usage: 2350, forecast: 2470 },
    { day: "Sat", usage: 2450, forecast: 2550 },
    { day: "Sun", usage: 2500, forecast: 2630 },
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#101624] text-white p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-white">AI Forecast</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forecast Chart */}
        <div className="bg-[#151b29] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-[#CBA244]">
            Fuel Consumption Forecast (in Litres)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2b313f" />
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#183e51"
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Current Usage"
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#CBA244"
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Forecast"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chatbot Section */}
        <div className="bg-[#151b29] p-6 rounded-2xl shadow-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-white">Chatbot</h2>
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-3 bg-[#191f2d] rounded-lg border border-[#2b313f]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.sender === "ai"
                    ? "bg-[#183e51] text-white self-start"
                    : "bg-[#2b313f] text-gray-100 self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#191f2d] rounded-lg border border-[#2b313f] focus:outline-none focus:border-[#183e51]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#183e51] rounded-lg font-semibold hover:opacity-90 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>


  );
};

export default ForecastingPage;