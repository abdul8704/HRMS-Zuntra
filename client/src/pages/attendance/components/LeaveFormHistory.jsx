import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import api from '../../../api/axios'
import { Loading } from '../../utils/Loading';
import { BASE_URL } from '../../../api/axios';

export const LeaveFormHistory = ({ userRole = 'default' }) => { // Approve userRole as prop, default to 'hr'
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state for HR updates
  const [hrStatus, setHrStatus] = useState('');
  const [hrReason, setHrReason] = useState('');

  // Form state for Team Lead updates
  const [tlStatus, setTlStatus] = useState('');
  const [tlReason, setTlReason] = useState('');

  useEffect(() => {
    const fetchleaveData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/hr/leave/all-req"); // your API endpoint

        if (response.data.success && response.data.leaveData?.length > 0) {
          const updatedData = response.data.leaveData.map(emp => ({
            ...emp,
            employeeName: emp.requestedBy || 'Unknown',
            employeeProfile: `${BASE_URL}/uploads/profilePictures/${emp.requestedId}.png`,
          }));

          setLeaveHistory(updatedData);
        } else {
          setLeaveHistory([]); // blank if none
        }
      } catch (err) {
        console.error("Error fetching pending leave requests:", err);
        setLeaveHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchleaveData();
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
      case 'approved':
        return '✓';
      case 'accepted':
        return '✓';
      case 'rejected':
        return '✕';
      case 'pending':
        return '-';
      default:
        return 'data-varalai';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'text-green-600';
      case 'accepted':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      case 'in progress':
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleViewClick = (item) => {
    setShowPopup(false);
    setTimeout(() => {
      setSelectedLeave(item);
      setHrStatus(item.HR || '');
      setHrReason(item.HRComment || '');
      setTlStatus(item.TL || '');
      setTlReason(item.TLComment || '');
      setShowPopup(true);
    }, 0);
  };

  const handleSave = async () => {
    if (userRole === 'hr') {
      if (!hrStatus) {
        alert('Please select HR status');
        return;
      }

      if (!hrReason.trim()) {
        alert('Please provide HR reason');
        return;
      }
    } else if (userRole === 'teamlead') {
      if (!tlStatus) {
        alert('Please select Team Lead status');
        return;
      }

      if (!tlReason.trim()) {
        alert('Please provide Team Lead reason');
        return;
      }
    }

    try {
      setIsSaving(true);

      if (userRole == 'hr') {
        const payload = {
          leaveId: selectedLeave.leaveId,
          decision: hrStatus,
          comment: hrReason,
        };

        const response = await api.post(`/api/hr/leave/process-req`, payload);

        if (response.data.success) {
          // Update the local state
          setLeaveHistory(prevHistory =>
            prevHistory.map(item =>
              item.leaveId === selectedLeave.leaveId
                ? { ...item, HR: hrStatus, HRComment: hrReason, status: hrStatus }
                : item
            )
          );

          setShowPopup(false);
          alert(`Leave status updated successfully by ${userRole === 'hr' ? 'HR' : 'Team Lead'}`);
        } else {
          alert('Failed to update leave status');
        }
      }
      else {
        const payload = {
          leaveId: selectedLeave.leaveId,
          decision: tlStatus,
          comment: tlReason,
        };

        const response = await api.post(`/api/employee/leave/process-req`, payload);

        if (response.data.success) {
          // Update the local state
          setLeaveHistory(prevHistory =>
            prevHistory.map(item =>
              item.leaveId === selectedLeave.leaveId
                ? { ...item, TL: tlStatus, TLComment: tlReason, status: (item.HR === "PENDING") ? tlStatus : item.HR }
                : item
            )
          );

          setShowPopup(false);
          alert(`Leave status updated successfully by ${userRole === 'hr' ? 'HR' : 'Team Lead'}`);
        } else {
          alert('Failed to update leave status');
        }
      }



    } catch (error) {
      console.error('Error updating leave status:', error);
      alert('Error updating leave status');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setHrStatus(selectedLeave?.HR || '');
    setHrReason(selectedLeave?.HRComment || '');
    setTlStatus(selectedLeave?.TL || '');
    setTlReason(selectedLeave?.TLComment || '');
    setShowPopup(false);
  };

  return (
    <>
      {isLoading ? <Loading /> : (
        <div className="w-full p-4 overflow-x-hidden">
          <table className="w-full text-sm border-collapse shadow-sm table-fixed">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 text-left">Employee</th>
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
                  <td className="p-2 flex items-center gap-2">
                    <img src={item.employeeProfile} alt="Profile" className="w-8 h-8 rounded-full" />
                    <span>{item.employeeName}</span>
                  </td>
                  <td className="p-2">
                    {item.dates[0] !== item.dates[item.dates.length - 1] ? (
                      <>
                        {formatDate(item.dates[0])} <span className="mx-1">To</span> {formatDate(item.dates[item.dates.length - 1])}
                      </>
                    ) : (
                      formatDate(item.dates[0])
                    )}
                  </td>

                  <td className="p-2 text-center">{getSymbol(item.TL)}</td>
                  <td className="p-2 text-center">{getSymbol(item.HR)}</td>
                  <td className={`p-2 font-medium ${getStatusColor(item.status)}`}>
                    {item.status.toUpperCase()}
                  </td>
                  <td className="p-2">
                    <div className="flex justify-center items-center">
                      <Eye
                        className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                        onClick={() => handleViewClick(item)}
                      />
                    </div>
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
                  onClick={handleCancel}
                  className="absolute top-2 right-4 text-gray-500 hover:text-red-500 text-2xl"
                >
                  &times;
                </button>

                <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
                  Leave Details
                </h2>

                {/* Employee Profile Section */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedLeave.employeeProfile}
                      alt="Employee Profile"
                      className="w-16 h-16 rounded-full border-2 border-gray-300"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {selectedLeave.employeeName}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div><span className="font-medium">Team:</span> {selectedLeave.teamName}</div>
                        <div><span className="font-medium">Team Lead:</span> {selectedLeave.teamLeadName}</div>
                      </div>
                    </div>
                  </div>
                </div>

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

                  {/* TL Status & HR Status */}
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-[150px]">
                      <div className="font-semibold text-gray-700 mb-1">Team Lead Status:</div>
                      {userRole === 'teamlead' ? (
                        <select
                          value={tlStatus.toUpperCase()}
                          onChange={(e) => setTlStatus(e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Pending</option>
                          <option value="APPROVED">Approve</option>
                          <option value="REJECTED">Reject</option>
                        </select>
                      ) : (
                        <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800 break-words whitespace-pre-wrap max-w-full">
                          {selectedLeave.TL || '-'}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-[150px]">
                      <div className="font-semibold text-gray-700 mb-1">HR Status:</div>
                      {userRole === 'hr' ? (
                        <select
                          value={hrStatus.toUpperCase()}
                          onChange={(e) => setHrStatus(e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Pending</option>
                          <option value="APPROVED">Approve</option>
                          <option value="REJECTED">Reject</option>
                        </select>
                      ) : (
                        <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800 break-words whitespace-pre-wrap max-w-full">
                          {selectedLeave.HR || '-'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* TL Reason & HR Reason */}
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-[150px]">
                      <div className="font-semibold text-gray-700 mb-1">Team Lead Reason:</div>
                      {userRole === 'teamlead' ? (
                        <textarea
                          value={tlReason}
                          onChange={(e) => setTlReason(e.target.value)}
                          placeholder="Enter Team Lead reason..."
                          className="w-full h-16 bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800 h-16 overflow-y-auto break-words whitespace-pre-wrap">
                          {selectedLeave.TLComment || '-'}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-[150px]">
                      <div className="font-semibold text-gray-700 mb-1">HR Reason:</div>
                      {userRole === 'hr' ? (
                        <textarea
                          value={hrReason}
                          onChange={(e) => setHrReason(e.target.value)}
                          placeholder="Enter HR reason..."
                          className="w-full h-16 bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800 h-16 overflow-y-auto break-words whitespace-pre-wrap">
                          {selectedLeave.HRComment || '-'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Save and Cancel Buttons */}
                {userRole !== 'default' ? (
                  <div className="flex justify-center gap-4 mt-6 pt-4 border-t">
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="py-3 min-w-[120px] rounded-full font-medium transition-colors duration-300 bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave()}
                      disabled={
                        isSaving ||
                        (userRole === 'hr' && (hrStatus == 'PENDING' || hrStatus == '' || !hrReason.trim())) ||
                        (userRole === 'teamlead' && (tlStatus == 'PENDING' || tlStatus == '' || !tlReason.trim()))
                      }
                      className={`py-3 min-w-[120px] rounded-full font-medium transition-colors duration-300
                        ${((userRole === 'hr' && hrStatus && hrReason.trim()) ||
                          (userRole === 'teamlead' && tlStatus && tlReason.trim())) && !isSaving
                          ? 'bg-[#BBD3CC] text-gray-700 hover:bg-[#A6C4BA]'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                ) : (
                  <></>
                )
                } 
                

              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};