import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import api from '../../../api/axios'
import { Loading } from '../../utils/Loading';
const LeaveFormHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    try {
      const fetchLeaveReqs = async () => {
        setLoading(true);
        const requests = await api.get("/api/employee/leave/requests");
        if (requests.data.success) {
          setLoading(false);
        }
        setLeaveHistory(requests.data.leaveRequests);
      }
      fetchLeaveReqs();
    }
    catch (err) {
      console.error(err)
    }
  }, [])


  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getSymbol = (value) => {
    switch (value?.toLowerCase()) {
      case 'approved':
        return '✓';
      case 'rejected':
        return '✕';
      case 'pending':
        return '-';
      default:
        return '?';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      case 'in progress':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : (
        <div className="w-full p-4 overflow-x-hidden">
          <table className="w-full text-sm border-collapse shadow-sm table-fixed">
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
                  <td className={`p-2 font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </td>
                  <td className="p-2 text-center">
                    <Eye
                      className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600"
                      onClick={() => {
                        setShowPopup(false);
                        setTimeout(() => {
                          setSelectedLeave(item);
                          setShowPopup(true);
                        }, 0);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* POPUP */}
          {showPopup && selectedLeave && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4 overflow-x-hidden">
              <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl relative overflow-y-auto max-h-[90vh]">
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-2 right-4 text-gray-500 hover:text-red-500 text-2xl"
                >
                  &times;
                </button>

                <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
                  Leave Details
                </h2>

                <div className="space-y-3 text-sm">
                  {/* Dates & Category */}
                  <div className="flex gap-4 flex-wrap">
                    {[{ label: 'Start Date', value: formatDate(selectedLeave.dates[0]) },
                    { label: 'End Date', value: formatDate(selectedLeave.dates[selectedLeave.dates.length - 1]) },
                    { label: 'Category', value: selectedLeave.leaveCategory || '-' },
                    ].map((item, index) => (
                      <div key={index} className="flex-1 min-w-[120px]">
                        <div className="font-semibold text-gray-700 mb-1">{item.label}:</div>
                        <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800 break-words whitespace-pre-wrap max-w-full">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Employee Reason */}
                  <div className="flex gap-4">
                    {[{ label: 'Employee Reason', value: selectedLeave.reason || '-' }].map(
                      (item, index) => (
                        <div key={index} className="w-full">
                          <div className="font-semibold text-gray-700 mb-1">{item.label}:</div>
                          <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800 h-16 overflow-y-auto break-words whitespace-pre-wrap">
                            {item.value}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* TL/HR Status */}
                  <div className="flex gap-4 flex-wrap">
                    {[{ label: 'Team Lead Status', value: selectedLeave.adminAction || '-' },
                    { label: 'HR Status', value: selectedLeave.superAdminAction || '-' },
                    ].map((item, index) => (
                      <div key={index} className="flex-1 min-w-[150px]">
                        <div className="font-semibold text-gray-700 mb-1">{item.label}:</div>
                        <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800 break-words whitespace-pre-wrap max-w-full">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* TL/HR Reason */}
                  <div className="flex gap-4 flex-wrap">
                    {[{ label: 'Team Lead Reason', value: selectedLeave.adminReason || '-' },
                    { label: 'HR Reason', value: selectedLeave.superAdminReason || '-' },
                    ].map((item, index) => (
                      <div key={index} className="flex-1 min-w-[150px]">
                        <div className="font-semibold text-gray-700 mb-1">{item.label}:</div>
                        <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800 h-16 overflow-y-auto break-words whitespace-pre-wrap">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LeaveFormHistory;
