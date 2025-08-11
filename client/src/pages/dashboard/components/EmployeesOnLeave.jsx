import React from "react";

// 👤 Reusable Employee Profile Card (Smaller Version)
export const EmpProfile = ({
  name,
  role,
  avatar,
  tl = false,
  color = "rgba(255,255,255,0.2)",
}) => {
  const firstName = name.split(" ")[0];

  return (
    <div
  className="flex items-center rounded-full pl-1 pr-3 py-1 w-full h-12 relative"
  style={{ backgroundColor: color }}
>

      {tl && (
        <svg
          className="absolute top-[0.2rem] right-[0.6rem] w-[0.75rem] h-[0.75rem] text-[#d4af37]"
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="#d4af37"
        >
          <path d="M200-160v-80h560v80H200Zm0-140-51-321..." />
        </svg>
      )}
      <img
  src={avatar}
  alt={firstName}
  className="w-12 h-12 rounded-full mr-3 object-cover shrink-0"
  style={{ objectPosition: "center" }}
/>

      <div className="flex flex-col justify-center overflow-hidden">
        <div className="font-bold text-sm truncate leading-tight text-black">
          {firstName}
        </div>
        <div className="text-xs text-gray-600 truncate leading-tight">
          {role}
        </div>
      </div>
    </div>
  );
};

// 📋 Main Component
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
    <div className="bg-[#B0C4DE] rounded-2xl px-6 py-5 shadow-md w-full h-full flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Employee on leave</h2>
        <div className="flex gap-2">
          <select className="bg-[#d3dce7] text-sm px-3 py-1.5 rounded-lg shadow-sm outline-none">
            <option>10-10-2010</option>
            <option>11-10-2010</option>
          </select>
          <select className="bg-[#d3dce7] text-sm px-3 py-1.5 rounded-lg shadow-sm outline-none">
            <option>ALL</option>
            <option>Team A</option>
          </select>
        </div>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-3 gap-3 overflow-y-auto pr-2 max-h-[17rem] custom-scrollbar">
        {leaveEmployees.map((emp, index) => (
          <div
            key={index}
            className="bg-[#d3dce7] rounded-full flex items-center justify-start p-1"
          >
            <EmpProfile
              name={emp.name}
              role={emp.role}
              avatar={emp.image}
              color="transparent"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
