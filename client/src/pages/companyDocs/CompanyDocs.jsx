import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { FaEye } from 'react-icons/fa';

export const CompanyDocs = () => {
  const dummyData = [
    {
      document: 'Aadhar Card',
      givenDate: '10-Jul-2025',
      validUpto: '10-Jul-2035',
      url: 'https://example.com/aadhar.pdf',
    },
    {
      document: 'PAN Card',
      givenDate: '05-Jun-2025',
      validUpto: '05-Jun-2030',
      url: 'https://example.com/pan.pdf',
    },
  ];

  return (
    <div className="flex h-screen font-sans">
      <Sidebar role={"HR"} />
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        <div className="bg-[#f8f9fb] rounded-lg overflow-hidden shadow border">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-[#f8f9fb] text-left font-semibold text-black">
              <tr>
                <th className="px-6 py-3">Documents</th>
                <th className="px-6 py-3">Given Date</th>
                <th className="px-6 py-3">Valid Upto</th>
                <th className="px-6 py-3">View</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {dummyData.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-3">{item.document}</td>
                  <td className="px-6 py-3">{item.givenDate}</td>
                  <td className="px-6 py-3">{item.validUpto}</td>
                  <td className="px-6 py-3">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black"
                    >
                      <FaEye size={16} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
