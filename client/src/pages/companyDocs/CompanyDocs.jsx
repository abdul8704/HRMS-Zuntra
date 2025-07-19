import React, { useState, useCallback, useMemo } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { FaEye } from 'react-icons/fa';
import { Navbar } from '../../components/Navbar';

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
    {
      document: 'Passport',
      givenDate: '15-Mar-2025',
      validUpto: '15-Mar-2035',
      url: 'https://example.com/passport.pdf',
    },
    {
      document: 'Driving License',
      givenDate: '20-Jan-2025',
      validUpto: '20-Jan-2030',
      url: 'https://example.com/license.pdf',
    },
  ];

  // Filter states
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Utility function to check if string includes search term
  const includesSearchTerm = useCallback((str, term) => {
    return str?.toLowerCase().includes(term.toLowerCase()) || false;
  }, []);

  // Memoized filtered documents
  const filteredDocuments = useMemo(() => {
    if (!searchTerm.trim()) return dummyData;

    return dummyData.filter((doc) => {
      const term = searchTerm.toLowerCase();
      return (
        includesSearchTerm(doc.document, term) ||
        includesSearchTerm(doc.givenDate, term) ||
        includesSearchTerm(doc.validUpto, term)
      );
    });
  }, [searchTerm, includesSearchTerm]);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setIsFilterActive(false);
  }, []);

  return (
    <div className="flex h-screen font-sans">
      <Sidebar role={"HR"} />
      <div className="flex-1 overflow-y-auto p-4 bg-white flex flex-col gap-4">
        <Navbar 
          type="companyDocuments"           
          showFilter={true} 
          isFilterActive={isFilterActive} 
          setIsFilterActive={setIsFilterActive} 
          handleClearFilters={handleClearFilters}
        />

        {/* Filter Section */}
        {isFilterActive && (
          <div className="w-full bg-[#BBD3CC] rounded-xl flex gap-[0.5rem] p-[0.5rem]">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by document name or date"
              className="bg-white/50 flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A6C4BA]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Clear Filters Button */}
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-white/70 text-gray-700 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          </div>
        )}

        {/* Filter Summary */}
        {isFilterActive && (
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing {filteredDocuments.length} of {dummyData.length} documents
            </div>
            <div className="flex gap-2">
              {searchTerm && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  Search: "{searchTerm}"
                </span>
              )}
            </div>
          </div>
        )}

        {/* Documents Table */}
        <div className="bg-[#f8f9fb] rounded-lg overflow-hidden shadow border flex-1">
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
              {filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500 font-medium">
                    {dummyData.length === 0 ? "No documents available" : "No documents match the current search"}
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((item, index) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};