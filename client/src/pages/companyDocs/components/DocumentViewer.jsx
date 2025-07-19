import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../api/axios";

export const DocumentViewer = ({ documentId, documentName }) => {
    const navigate = useNavigate();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPDF = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/uploads/companyDocuments/${documentId}.pdf`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) {
                    navigate("/404");
                    return;
                }

                const blob = await res.blob();

                // Use the documentName as filename
                const fileWithName = new File([blob], `${documentName}.pdf`, { type: "application/pdf" });
                const url = URL.createObjectURL(fileWithName);

                setPdfUrl(url);
            } catch (error) {
                console.error(error);
                navigate("/404");
            } finally {
                setLoading(false);
            }
        };

        fetchPDF();
    }, [documentId, documentName, navigate]);

    if (loading) {
        return (
            <div className="flex flex-1 justify-center items-center text-gray-600 text-lg">
                Loading document...
            </div>
        );
    }

    return (
        <>
            <div className="w-full relative bg-[#BBD3CC] rounded-xl flex items-center py-4 px-4">
                <button
                    className="text-2xl font-bold text-black hover:scale-110 transition"
                    onClick={() => navigate("/documents/all")}
                >
                    ←
                </button>
                <div className="flex-1 flex justify-center items-center">
                    <span className="text-lg">{documentName}</span>
                </div>
            </div>


            <iframe
                src={pdfUrl}
                title={documentName}
                className="w-full h-full rounded-xl border"
                style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
            />
        </>
    );
};
