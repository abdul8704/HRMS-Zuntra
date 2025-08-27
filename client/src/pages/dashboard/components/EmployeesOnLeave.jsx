import React, { useEffect, useState } from "react";
import api, { BASE_URL } from "../../../api/axios";
import { Loading } from "../../utils/Loading";
import { EmpProfile } from "./EmpProfile"; // assuming in same folder

export const EmployeesOnLeave = () => {
  const [leaveEmployees, setLeaveEmployees] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLeaveEmployees = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/hr/leave/today");
        if (res.data.success) {
          const formatted = res.data.employeesOnLeave.map(emp => ({
            name: emp.name,
            role: emp.role,
            image: `${BASE_URL}/uploads/profilePictures/${emp.requestedId}.png`, // 🔑 same as LeaveFormHistory
          }));

          setLeaveEmployees(formatted);
        }
      } catch (err) {
        console.error("Error fetching employees on leave:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveEmployees();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-[#B0C4DE] rounded-2xl px-6 py-5 shadow-md w-full h-full flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Employee on leave</h2>
        {/* filters if needed */}
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-3 gap-3 overflow-y-auto pr-2 max-h-[17rem] custom-scrollbar">
        {leaveEmployees.length > 0 ? (
          leaveEmployees.map((emp, idx) => (
            <div key={idx} className="bg-[#d3dce7] rounded-full flex items-center justify-start p-1">
              <EmpProfile
                name={emp.name}
                role={emp.role}
                avatar={emp.image}
                color="transparent"
              />
            </div>
          ))
        ) : (
          <div className="text-gray-600 text-sm col-span-3 text-center">
            No employees on leave today 🎉
          </div>
        )}
      </div>
    </div>
  );
};
