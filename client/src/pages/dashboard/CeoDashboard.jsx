import React, { useState } from "react";
import { Sidebar } from "../../components/Sidebar";

export const CeoDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="flex h-screen">
      <Sidebar role={"HR"} />

      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-white via-[#f0f4f5] to-[#dceef0] p-4">
        <div className="grid grid-cols-10 grid-rows-10 gap-4 h-full">
          {/* Left Graph Cards */}
          <div className="col-span-7 row-span-5 bg-[#BBD3CC] rounded-2xl shadow-xl" />
          <div className="col-span-7 row-start-6 row-span-5 bg-[#8979FF] rounded-2xl shadow-xl" />

          {/* Filter Card */}
          <div className="col-start-8 col-span-3 row-span-4 flex flex-col bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-5">
            <h2 className="text-[#08BDB1] text-xl font-semibold mb-4 text-center">
              Filter Insights
            </h2>

            <div className="space-y-4">
              {/* Time Filter */}
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

              {/* Custom Date Inputs */}
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

              {/* Project Dropdown */}
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

          {/* Textbox Card placed in col 8-10 and row 5-9 */}
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
