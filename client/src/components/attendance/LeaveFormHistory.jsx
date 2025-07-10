import React from 'react';
import { Eye } from 'lucide-react';

export const LeaveFormHistory = () => {
  const history = [
    { date: '2025-07-01', teamLead: 'Approved', hr: 'Pending', status: 'In Progress' },
    { date: '2025-06-20', teamLead: 'Approved', hr: 'Approved', status: 'Approved' },
    { date: '2025-06-05', teamLead: 'Rejected', hr: '-', status: 'Rejected' },
  ];

  const formatDate = (isoDate) => {
    const [year, month, day] = isoDate.split('-');
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
          {history.map((item, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="p-3 text-left">{formatDate(item.date)}</td>
              <td className="p-3 text-center font-medium">
                <span className={`${item.teamLead.toLowerCase() === 'approved' ? 'text-green-600' :
                    item.teamLead.toLowerCase() === 'rejected' ? 'text-red-600' :
                      'text-gray-600'
                  }`}>
                  {getSymbol(item.teamLead)}
                </span>
              </td>
              <td className="p-3 text-center font-medium">
                <span className={`${item.hr.toLowerCase() === 'approved' ? 'text-green-600' :
                    item.hr.toLowerCase() === 'rejected' ? 'text-red-600' :
                      'text-gray-600'
                  }`}>
                  {getSymbol(item.hr)}
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