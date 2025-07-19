import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { FaDownload } from 'react-icons/fa';
import api, { BASE_URL } from '../../api/axios';

export const CompanyDocs = () => {
  const navigate = useNavigate();
  const { navId } = useParams();
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

  // Add navigation handler
  const handleRowClick = useCallback((documentId) => {
    // Replace '/document-details' with your actual route
    navigate(`/document-details/${documentId}`);
  }, [navigate]);

  const handleDownload = async (e, id, name) => {
    // Prevent row click when download button is clicked
    e.stopPropagation();

    try {
      const response = await fetch(`${BASE_URL}/uploads/companyDocuments/${id}.pdf`, {
        method: 'GET',
        credentials: 'include'
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date)
      ? date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      : "-";
  };

  return (
    <div className="flex h-screen font-sans">
      <Sidebar role={"HR"} />
      <div className="flex-1 overflow-y-auto p-4 bg-white flex flex-col gap-4">
        {(navId === "all" || navId === "upload") &&
          <Navbar
            type="companyDocuments"
            showFilter={true}
            isFilterActive={isFilterActive}
            setIsFilterActive={setIsFilterActive}
            handleClearFilters={handleClearFilters}
          />
        }

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

        {navId === "all" && (
          loading || errorMessage ? (
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
                    <th className="px-6 py-3 text-center w-12"></th>
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
                    filteredDocuments.map((item, index) => {
                      const createdDate = formatDate(item.createdAt);
                      const validUptoDate = formatDate(item.validUpto);

                      return (
                        <tr
                          key={index}
                          className="border-t group hover:bg-blue-50 hover:shadow-sm transition-all duration-200 cursor-pointer select-none"
                          onClick={() => handleRowClick(item._id)}
                        >
                          <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                            {item.documentName}
                          </td>
                          <td className="px-6 py-4 text-right text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                            {createdDate}
                          </td>
                          <td className="px-6 py-4 text-right text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                            {validUptoDate}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={(e) => handleDownload(e, item._id, item.documentName)}
                              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-all duration-200 opacity-60 group-hover:opacity-100 cursor-pointer"
                              title="Download document"
                            >
                              <FaDownload size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )
        )}

      </div>
    </div>
  );
};