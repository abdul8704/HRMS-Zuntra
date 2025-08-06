import React, { useEffect, useState } from "react";
import { Eye, Filter } from "lucide-react";

const LeaveTable = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const leaveData = [
      { date: "2025-08-15", status: "Rejected" },
      { date: "2025-08-20", status: "Approved" },
      { date: "2025-08-25", status: "Pending" },
      { date: "2025-08-28", status: "Approved" },
      { date: "2025-08-30", status: "Rejected" },
    ];
    setLeaves(leaveData);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-400 font-medium";
      case "Pending":
        return "text-yellow-400 font-medium";
      case "Rejected":
        return "text-red-400 font-medium";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-600">
        <h2 className="text-lg font-semibold">Leave Record</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">August 2025</span>
          <Filter size={18} className="text-white cursor-pointer" />
        </div>
      </div>

      {/* Table */}
      <div className="h-[255px] overflow-y-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="sticky top-0 bg-gray-700 text-white z-10">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">View</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, index) => (
              <tr key={index} className="border-b border-gray-600 hover:bg-gray-700 transition">
                <td className="py-3 px-4">{leave.date}</td>
                <td className={`py-3 px-4 ${getStatusColor(leave.status)}`}>{leave.status}</td>
                <td className="py-3 px-4 text-center">
                  <Eye size={16} className="text-white ml-6" />
                </td>
              </tr>
            ))}
            {leaves.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400">
                  No leave records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveTable;
