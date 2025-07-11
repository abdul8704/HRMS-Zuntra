import React from "react";

export const EmployeesOnLeave = () => {
  const leaveEmployees = [
    {
      name: "Jai Atithya A",
      role: "Embedded & IoT Developer",
      image: "https://i.pravatar.cc/100?img=1",
    },
    {
      name: "Jai Atithya A",
      role: "Embedded & IoT Developer",
      image: "https://i.pravatar.cc/100?img=2",
    },
    {
      name: "Jai Atithya A",
      role: "Embedded & IoT Developer",
      image: "https://i.pravatar.cc/100?img=3",
    },
    {
      name: "Jai Atithya A",
      role: "Embedded & IoT Developer",
      image: "https://i.pravatar.cc/100?img=4",
    },
    {
      name: "Jai Atithya A",
      role: "Embedded & IoT Developer",
      image: "https://i.pravatar.cc/100?img=5",
    },
    {
      name: "Jai Atithya A",
      role: "Embedded & IoT Developer",
      image: "https://i.pravatar.cc/100?img=6",
    },
  ];

  return (
    <div className="bg-[#B0C4DE] rounded-xl p-4 shadow-md w-full h-full flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Employee on leave</h2>
        <div className="flex gap-2">
          <select className="bg-[#d3dce7] text-sm px-2 py-1 rounded-md">
            <option>10-10-2010</option>
            <option>11-10-2010</option>
          </select>
          <select className="bg-[#d3dce7] text-sm px-2 py-1 rounded-md">
            <option>ALL</option>
            <option>Team A</option>
          </select>
        </div>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1">
        {leaveEmployees.map((emp, index) => (
          <div
            key={index}
            className="bg-[#d3dce7] flex items-center p-2 rounded-xl gap-2"
          >
            <img
              src={emp.image}
              alt={emp.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-sm">
              <div className="font-medium">{emp.name}</div>
              <div className="text-xs text-gray-600">{emp.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
