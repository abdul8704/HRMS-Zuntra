import React, { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  CartesianGrid,
  LabelList,
} from "recharts";

export const CeoDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const barData = [
    { name: "THINK", "2020": 30, "2021": 50, "2022": 60 },
    { name: "RESEARCH", "2020": 45, "2021": 65, "2022": 85 },
    { name: "IDEASPACE", "2020": 60, "2021": 90, "2022": 95 },
    { name: "OUTCOME", "2020": 40, "2021": 70, "2022": 85 },
    { name: "TOOLS", "2020": 20, "2021": 60, "2022": 70 },
    { name: "ELECTRICITY", "2020": 30, "2021": 40, "2022": 60 },
    { name: "DATA", "2020": 25, "2021": 35, "2022": 55 },
  ];

  const bubbleData = [
    { x: 10, y: 30, z: 200, name: "PROJECT1" },
    { x: 20, y: 20, z: 100, name: "PROJECT2" },
    { x: 30, y: 80, z: 300, name: "PROJECT3" },
    { x: 50, y: 60, z: 400, name: "PROJECT4" },
    { x: 70, y: 40, z: 150, name: "PROJECT5" },
    { x: 90, y: 90, z: 250, name: "PROJECT6" },
    { x: 100, y: 70, z: 350, name: "PROJECT7" },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar role={"HR"} />
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-white via-[#f0f4f5] to-[#dceef0] p-4">
        <div className="grid grid-cols-10 grid-rows-10 gap-4 h-full">

          {/* Bar Chart Card */}
          <div className="col-span-7 row-span-5 bg-[#BBD3CC] rounded-2xl shadow-xl p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="2020" fill="#8884d8" />
                <Bar dataKey="2021" fill="#82ca9d" />
                <Bar dataKey="2022" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Improved Bubble Chart Card */}
          <div className="col-span-7 row-start-6 row-span-5 bg-[#BBD3CC] rounded-2xl shadow-xl p-4">
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="X" />
                <YAxis type="number" dataKey="y" name="Y" />
                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Size" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Projects" data={bubbleData} fill="#08BDB1">
                  <LabelList dataKey="name" position="top" fill="#000" fontSize={12} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Filter Card */}
          <div className="col-start-8 col-span-3 row-span-4 flex flex-col bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-5">
            <h2 className="text-[#08BDB1] text-xl font-semibold mb-4 text-center">
              Filter Insights
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time Range
                </label>
                <select
                  value={selectedFilter}
                  onChange={(e) => {
                    setSelectedFilter(e.target.value);
                    if (e.target.value !== "custom") {
                      setStartDate("");
                      setEndDate("");
                    }
                  }}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08BDB1] focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="current_year">Current Year</option>
                  <option value="current_month">Current Month</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {selectedFilter === "custom" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08BDB1] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08BDB1] focus:outline-none"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Project
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08BDB1] focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="project1">Project 1</option>
                  <option value="project2">Project 2</option>
                  <option value="project3">Project 3</option>
                  <option value="project4">Project 4</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes Card */}
          <div className="col-start-8 col-end-11 row-start-5 row-end-11 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-5">
            <h2 className="text-[#08BDB1] text-xl font-semibold mb-3">
              Details about graph
            </h2>
            <textarea
              rows={10}
              placeholder="Write notes or summary here..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#08BDB1] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
