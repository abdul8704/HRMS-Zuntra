import React, { useState } from 'react';

export const DocumentUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [documentName, setDocumentName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleNameChange = (e) => setDocumentName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile || !documentName.trim()) {
      alert("Please fill in all fields and upload a valid PDF.");
      return;
    }

    // For now, just simulate success
    alert(`Document "${documentName}" is ready to be uploaded!`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Left: Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 bg-white border rounded-lg p-4 shadow space-y-4"
      >
        <div>
          <label className="block font-medium text-sm text-gray-700">Document Name</label>
          <input
            type="text"
            value={documentName}
            onChange={handleNameChange}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            placeholder="e.g. Company Policy 2025"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {/* Right: PDF Preview */}
      <div className="w-full md:w-1/2 bg-white border rounded-lg p-4 shadow">
        <h2 className="text-md font-medium mb-2 text-gray-800">Preview</h2>
        {previewUrl ? (
          <iframe
            src={previewUrl}
            title="PDF Preview"
            className="w-full h-[500px] border rounded"
          ></iframe>
        ) : (
          <div className="text-gray-500 h-full flex items-center justify-center border border-dashed rounded p-4 min-h-[200px]">
            No document selected
          </div>
        )}
      </div>
    </div>
  );
};
