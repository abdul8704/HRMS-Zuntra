import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react"; // optional icon

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
        return "text-green-600 font-medium";
      case "Pending":
        return "text-yellow-600 font-medium";
      case "Rejected":
        return "text-red-600 font-medium";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="h-[255px] overflow-y-auto rounded-lg border border-gray-300 bg-black/20 shadow-md text-black">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="sticky top-0 bg-gray-200 text-white z-10">
          <tr className="text-gray-600">
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-center">View</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={index} className="border-b hover:bg-gray-200 transition">
              <td className="py-3 px-4 text-white">{leave.date}</td>
              <td className={`py-3 px-4 ${getStatusColor(leave.status)}`}>
                {leave.status}
              </td>
              <td className="py-3 px-4 text-center">
                <Eye size={16} className="text-black" />
              </td>
            </tr>
          ))}
          {leaves.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No leave records available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;
