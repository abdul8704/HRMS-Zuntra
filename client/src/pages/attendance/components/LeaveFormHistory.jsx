import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

const LeaveFormHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const dummyData = [
      {
        dates: ['2025-07-15'],
        leaveCategory: 'Sick Leave',
        reason: 'Fever and cold',
        adminAction: 'Approved',
        adminReason: 'Medical certificate provided',
        superAdminAction: 'Pending',
        superAdminReason: '',
        status: 'Approved',
      },
      {
        dates: ['2025-07-18'],
        leaveCategory: 'Personal Leave',
        reason: 'Family event',
        adminAction: 'Pending',
        adminReason: '',
        superAdminAction: 'Pending',
        superAdminReason: '',
        status: 'Pending',
      }
    ];
    setLeaveHistory(dummyData);
  }, []);

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getSymbol = (value) => {
    switch (value?.toLowerCase()) {
      case 'approved': return '✓';
      case 'rejected': return '✕';
      case 'pending': return '-';
      default: return '?';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'text-green-600';
      case 'rejected': return 'text-red-600';
      case 'in progress': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="w-full p-4">
      <table className="w-full text-sm border-collapse shadow-sm">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-center">TL</th>
            <th className="p-2 text-center">HR</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-center">View</th>
          </tr>
        </thead>
        <tbody>
          {leaveHistory.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2">{formatDate(item.dates[0])}</td>
              <td className="p-2 text-center">{getSymbol(item.adminAction)}</td>
              <td className="p-2 text-center">{getSymbol(item.superAdminAction)}</td>
              <td className={`p-2 text-left font-medium ${getStatusColor(item.status)}`}>{item.status}</td>
              <td className="p-2 text-center">
                <Eye
                  className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600"
                  onClick={() => {
                    setSelectedLeave(item);
                    setShowPopup(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* POPUP with gray background only for values */}
      {showPopup && selectedLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-6 text-center text-gray-800">Leave Details</h2>

           <div className="space-y-3 text-sm">
  {[
    { label: "Start Date", value: formatDate(selectedLeave.dates[0]) },
    { label: "End Date", value: formatDate(selectedLeave.dates[selectedLeave.dates.length - 1]) },
    { label: "Category", value: selectedLeave.leaveCategory || '-' },
    { label: "Employee Reason", value: selectedLeave.reason || '-' },
    { label: "Team Lead Status", value: selectedLeave.adminAction || '-' },
    { label: "Team Lead Reason", value: selectedLeave.adminReason || '-' },
    { label: "HR Status", value: selectedLeave.superAdminAction || '-' },
    { label: "HR Reason", value: selectedLeave.superAdminReason || '-' },
    {
      label: "Final Status",
      value: (
        <span className={`font-medium ${getStatusColor(selectedLeave.status)}`}>
          {selectedLeave.status}
        </span>
      )
    }
  ].map((item, index) => (
    <div key={index} className="flex items-start gap-4">
      <span className="font-semibold text-gray-700 w-40">{item.label}:</span>
      <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800 flex-1">
        {item.value}
      </div>
    </div>
  ))}
</div>

          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveFormHistory;
