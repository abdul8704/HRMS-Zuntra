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
          {/* Card 1 */}
          <div className="col-span-7 row-span-5 bg-[#BBD3CC] rounded-2xl shadow-xl"></div>

          {/* Card 2 */}
          <div className="col-span-7 row-start-6 row-span-5 bg-[#8979FF] rounded-2xl shadow-xl"></div>

          {/* Card 3 - Right panel */}
          <div className="col-start-8 col-span-3 row-span-10 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            <div className="w-full">
              <h2 className="text-[#08BDB1] text-2xl font-bold mb-6 text-center">
                Filter Insights
              </h2>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md space-y-4">
                {/* Filter Dropdown */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Time Range
                  </label>
                  <select
                    value={selectedFilter}
                    onChange={(e) => {
                      setSelectedFilter(e.target.value);
                      // Reset custom dates on change
                      if (e.target.value !== "custom") {
                        setStartDate("");
                        setEndDate("");
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08BDB1] focus:outline-none transition"
                  >
                    <option value="">Select</option>
                    <option value="current_year">Current Year</option>
                    <option value="current_month">Current Month</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                {/* Conditional Date Pickers */}
                {selectedFilter === "custom" && (
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08BDB1] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08BDB1] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Project Dropdown */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Project</label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08BDB1] focus:outline-none transition"
                  >
                    <option value="">Select</option>
                    <option value="project1">Project 1</option>
                    <option value="project2">Project 2</option>
                    <option value="project3">Project 3</option>
                    <option value="project4">Project 4</option>
                  </select>
                </div>
              </div>

              {/* Output Summary */}
              <div className="mt-6 text-center text-gray-600 text-sm space-y-1">
                <p>
                  <strong className="text-[#08BDB1]">Filter:</strong>{" "}
                  {selectedFilter || "N/A"}
                </p>
                {selectedFilter === "custom" && (
                  <>
                    <p>
                      <strong className="text-[#08BDB1]">Start Date:</strong>{" "}
                      {startDate || "Not selected"}
                    </p>
                    <p>
                      <strong className="text-[#08BDB1]">End Date:</strong>{" "}
                      {endDate || "Not selected"}
                    </p>
                  </>
                )}
                <p>
                  <strong className="text-[#08BDB1]">Project:</strong>{" "}
                  {selectedProject || "N/A"}
                </p>
              </div>
            </div>

            {/* Bottom Reserved */}
            <div className="text-center text-gray-400 text-sm mt-6">
              (Reserved for analytics / progress charts)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
