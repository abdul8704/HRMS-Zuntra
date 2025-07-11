import React from 'react';
import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../api/axios'

export const LeaveFormHistory = () => {
  

  useEffect(() => {
    try{
      const fetchLeaveReqs = async () => {
        const requests = await api.get("/api/employee/leave/requests");
        setLeaveHistory(requests.data.leaveRequests);
      }

      fetchLeaveReqs();
    }
    catch(err){
      console.log(err)
    } 
  }, [])

  const [ leaveHistory, setLeaveHistory ] = useState([]);

  const history = [
    { date: '2025-07-01', teamLead: 'Approved', hr: 'Pending', status: 'Approved' },
    { date: '2025-06-20', teamLead: 'Approved', hr: 'Approved', status: 'Approved' },
    { date: '2025-05-20', teamLead: 'Pending', hr: 'Pending', status: 'In Progress' },
    { date: '2025-06-05', teamLead: 'Rejected', hr: '-', status: 'Rejected' },
  ];

  const formatDate = (rawDate) => {
    const date = new Date(rawDate)
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  const getSymbol = (value) => {
    switch (value.toLowerCase()) {
      case 'approved':
        return '✓';
      case 'rejected':
        return '✕';
      case 'pending':
        return '-';
      default:
        return value === '-' ? '-' : '?';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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
  console.log("hostory", leaveHistory)

  return (
    <div className="w-full h-full overflow-auto rounded-lg ">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="p-3 text-left font-semibold text-gray-700">Date</th>
            <th className="p-3 text-center font-semibold text-gray-700">TL</th>
            <th className="p-3 text-center font-semibold text-gray-700">HR</th>
            <th className="p-3 text-left font-semibold text-gray-700">Status</th>
            <th className="p-3 text-center font-semibold text-gray-700">View</th>
          </tr>
        </thead>
        <tbody>
          {leaveHistory.map((item, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="p-3 text-left">{formatDate(item.dates[0])}</td>
              <td className="p-3 text-center font-medium">
                <span className={`${item.adminAction.toLowerCase() === 'approved' ? 'text-green-600' :
                  item.adminAction.toLowerCase() === 'rejected' ? 'text-red-600' :
                      'text-gray-600'
                  }`}>
                  {getSymbol(item.adminAction)}
                </span>
              </td>
              <td className="p-3 text-center font-medium">
                <span className={`${item.superAdminAction.toLowerCase() === 'approved' ? 'text-green-600' :
                    item.superAdminAction.toLowerCase() === 'rejected' ? 'text-red-600' :
                      'text-gray-600'
                  }`}>
                  {getSymbol(item.superAdminAction)}
                </span>
              </td>
              <td className="p-3 text-left">
                <span className={`font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </td>
              <td className="p-3 text-center">
                <Eye className="w-4 h-4 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveFormHistory;