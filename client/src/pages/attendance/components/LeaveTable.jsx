import React, { useEffect, useState } from "react";
import { Eye, Filter } from "lucide-react";
import { isoToDateStr } from "../../../utils/dateUtils"
import api from "../../../api/axios"

const LeaveTable = ({ data }) => {
  const [leaves, setLeaves] = useState([]);
  const { userid } = data;

  useEffect(() => {
    const getLeaveTableData = async () => {
      const leaveData = await api.get(`/api/employee/leave/requests/${userid}`)
      console.log("data ", leaveData.data.leaveRequests)
      setLeaves(leaveData.data.leaveRequests);
    }
    getLeaveTableData();
  }, []);

  const getStatusColor = (status) => {
    let state = status.toLowerCase();
    switch (state) {
      case "approved":
        return "text-green-400 font-medium";
      case "pending":
        return "text-yellow-400 font-medium";
      case "rejected":
        return "text-red-400 font-medium";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-gray-200 text-gray-800 rounded-lg shadow-lg pb-2">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-400">
        <h2 className="font-semibold">Leave Record</h2>
        <div className="flex items-center gap-2">
          <span className="text-[0.75rem] text-gray-600">August 2025</span>
          <Filter size={18} className="text-gray-700 cursor-pointer" />
        </div>
      </div>

      {/* Table */}
      <div className="h-[255px] overflow-y-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="sticky top-0 bg-gray-300 text-gray-800 z-10">
            <tr>
              <th className="py-2 px-4 font-medium">Date</th>
              <th className="py-2 px-4 font-medium">Status</th>
              <th className="py-2 px-4 text-center font-medium">View</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No leave records available.
                </td>
              </tr>
            ) : (leaves.map((leave, index) => (
              <tr key={index} className="border-b border-gray-400 hover:bg-gray-300 transition">
                <td className="py-2 text-[0.75rem] px-4">{isoToDateStr(leave.dates[0])}</td>
                <td className={`py-2 px-4 text-[0.75rem] ${getStatusColor(leave.status)}`}>{leave.status}</td>
                <td className="py-2 px-4 text-center text-[0.75rem]">
                  <Eye size={16} className="text-gray-700 ml-6" />
                </td>
              </tr>
            )))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveTable;