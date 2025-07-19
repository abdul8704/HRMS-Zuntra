import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { FaDownload } from 'react-icons/fa';
import api from '../../api/axios';

export const CompanyDocs = () => {
  const [documents, setDocuments] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const res = await api.get("/api/docs");

        if (res.data.success) {
          setDocuments(res.data.data);
        } else {
          setErrorMessage(res.data.message || "Failed to fetch documents.");
        }
      } catch (error) {
        console.error("API Error:", error);

        const message =
          error.response?.data?.data?.message ||
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while fetching documents.";

        setErrorMessage(message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const includesSearchTerm = useCallback((str, term) => {
    return str?.toLowerCase().includes(term.toLowerCase()) || false;
  }, []);

  const filteredDocuments = useMemo(() => {
    if (!searchTerm.trim()) return documents;

    return documents.filter((doc) =>
      includesSearchTerm(doc.documentName, searchTerm)
    );
  }, [searchTerm, documents, includesSearchTerm]);

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setIsFilterActive(false);
  }, []);

  const getPdfUrl = (id) => `/uploads/companyDocuments/${id}.pdf`;

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
          <div className="w-full bg-[#BBD3CC] rounded-xl flex gap-2 p-2">
            <input
              type="text"
              placeholder="Search by document name"
              className="bg-white/50 flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A6C4BA]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              Showing {filteredDocuments.length} of {documents.length} documents
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

        {/* Loading & Error */}
        {loading || errorMessage ? (
          <div className="flex-1 flex justify-center items-center text-gray-600 text-lg">
            {loading ? "Loading..." : errorMessage}
          </div>
        ) : (
          <div className="bg-[#f8f9fb] rounded-lg overflow-hidden shadow border flex-1">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-[#f8f9fb] text-left font-semibold text-black">
                <tr>
                  <th className="px-6 py-3">Document</th>
                  <th className="px-6 py-3 text-right">Given Date</th>
                  <th className="px-6 py-3 text-right">Valid Upto</th>
                  <th className="px-6 py-3 text-center w-12">{/* Download */}</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {filteredDocuments.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500 font-medium">
                      {documents.length === 0
                        ? "No documents available"
                        : "No documents match the current search"}
                    </td>
                  </tr>
                ) : (
                  filteredDocuments.map((item, index) => (
                    <tr key={index} className="border-t group hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-3">{item.documentName}</td>
                      <td className="px-6 py-3 text-right">
                        {new Date(item.givenDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3 text-right">
                        {new Date(item.validUpto).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <a
                          href={getPdfUrl(item._id)}
                          download
                          className="inline-block text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <FaDownload size={16} />
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
