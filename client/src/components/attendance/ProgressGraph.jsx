import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProgressGraphCard() {
  const data = [
    { label: "Mon", value: 45 },
    { label: "Tue", value: 60 },
    { label: "Wed", value: 70 },
    { label: "Thu", value: 80 },
    { label: "Fri", value: 90 },
    { label: "Sat", value: 95 },
    { label: "Sun", value: 100 },
  ];

  return (
    <div className="rounded-2xl shadow-md bg-white dark:bg-gray-800 p-6 w-full max-w-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Progress Overview
      </h3>
      <div style={{ height: "250px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 16, bottom: 5, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
