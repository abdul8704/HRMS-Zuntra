import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { Download, Edit, Trash2 } from 'lucide-react';
import { DocumentViewer } from './components/DocumentViewer'
import api, { BASE_URL } from '../../api/axios';
import { DocumentUploadForm } from './components/DocumentUploadForm';
import { useAuth } from "../../context/AuthContext";
import { Loading } from '../../components/Loading';

export const CompanyDocs = () => {
  const navigate = useNavigate();
  const { navId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, loading } = useAuth();
  if (!loading) {
    console.log(user.allowedAccess);
  }
  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [navId]);

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
    navigate(`/documents/${documentId}`);
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


  const handleDelete = async (e, id) => {
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this document?")) return;
    if (!window.confirm("After you delete git push in vscode")) return;

    try {
      const response = await api.delete(`/api/docs/${id}`);

      if (response.data.success) {
        setDocuments(prev => prev.filter(doc => doc._id !== id));
      } else {
        console.error("Delete failed:", response.data.message);
        alert(response.data.message || "Failed to delete document");
      }
    } catch (error) {
      console.error("Delete error:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while deleting the document.";
      alert(message);
    }
  };


  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? "-"
      : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
  };


  return (
    <div className="flex h-screen font-sans">
      <Sidebar role={"HR"} />
      <div className="flex-1 h-screen overflow-y-auto p-4 bg-white flex flex-col gap-4">
        {loading ? <Loading /> : (
          <>
            {(navId === "all" || navId === "upload") &&
              <Navbar
                type="companyDocuments"
                companyDocumentAccess={user.allowedAccess.includes("companyDocs")}
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
              isLoading || errorMessage ? (
                <div className="flex-1 flex justify-center items-center text-gray-600 text-lg">
                  {isLoading ? "Loading..." : errorMessage}
                </div>
              ) : (
                <div className="bg-[#f8f9fb] rounded-lg overflow-hidden shadow border flex-1">
                  <table className="min-w-full table-auto text-sm">
                    <thead className="bg-[#f8f9fb] text-left font-semibold text-black">
                      <tr>
                        <th className="px-6 py-3">Document</th>
                        <th className="px-6 py-3 text-right">Uploaded On</th>
                        <th className="px-6 py-3 text-right">Valid Upto</th>
                        <th className="px-6 py-3 w-32"></th>
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
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <button
                                    onClick={(e) => handleDownload(e, item._id, item.documentName)}
                                    className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-green-600 hover:bg-green-100 rounded-full transition-all duration-200"
                                  >
                                    <Download size={14} />
                                  </button>
                                  {user.allowedAccess.includes('companyDocs') && (
                                    <>
                                      <button
                                        onClick={(e) => handleDelete(e, item._id)}
                                        className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full transition-all duration-200"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </>
                                  )}
                                </div>
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
            {navId === "upload" && (
              <DocumentUploadForm />
            )}
            {navId !== "all" && navId !== "upload" && (() => {
              const selectedDoc = documents.find((doc) => doc._id === navId);
              return (
                <DocumentViewer
                  documentId={navId}
                  documentName={selectedDoc?.documentName || "Document"}
                />
              );
            })()}
          </>
        )}

      </div>
    </div>
  );
};