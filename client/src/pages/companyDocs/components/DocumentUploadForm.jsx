import React, { useState } from 'react';
import { Upload, File, Calendar, Check, X } from 'lucide-react';
import api from '../../../api/axios';

export function DocumentUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [validUpto, setValidUpto] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (file) => {
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
      if (file) {
        alert('Please select a valid PDF file.');
      }
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleNameChange = (e) => setDocumentName(e.target.value);
  const handleDateChange = (e) => setValidUpto(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documentName.trim()) {
      alert('Please fill in Document Name.');
      return;
    }

    if (!selectedFile) {
      alert('Please select a PDF file to upload.');
      return;
    }

    try {
      setLoading(true);
      const metadataPayload = {
        documentName,
        validUpto: validUpto.trim() === '' ? null : validUpto,
      };
      const metadataResponse = await api.post('/api/docs/add', metadataPayload);

      if (!metadataResponse?.data?.data?._id) {
        throw new Error('No document ID returned from server');
      }

      const documentId = metadataResponse.data.data._id;
      const encodedName = encodeURIComponent(documentName);

      const formData = new FormData();
      formData.append('file', selectedFile);
      const uploadResponse = await api.post(
        `/api/docs/upload/${documentId}/${encodedName}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert('Document uploaded successfully!');
      console.log('Upload response:', uploadResponse.data);

      setDocumentName('');
      setValidUpto('');
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-[1rem] h-full">
      {/* Left: Form */}
      <div className="flex flex-col flex-1 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <File className="w-5 h-5 mr-2 text-blue-600" />
          Document Details
        </h2>

        <form className="space-y-6 flex flex-col flex-1" onSubmit={handleSubmit}>
          {/* Document Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Name
            </label>
            <input
              type="text"
              value={documentName}
              onChange={handleNameChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter document name"
              required
            />
          </div>

          {/* Valid Until Date with Clear Button */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Valid Until
            </label>
            <div className="relative flex items-center">
              <input
                type="date"
                value={validUpto}
                onChange={handleDateChange}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              {validUpto && (
                <button
                  type="button"
                  onClick={() => setValidUpto('')}
                  className="absolute right-3 text-red-500 hover:text-red-700"
                  title="Clear date"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Upload className="w-4 h-4 mr-1" />
              Upload PDF Document
            </label>

            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                dragOver
                  ? 'border-blue-500 bg-blue-50'
                  : selectedFile
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {selectedFile ? (
                <div className="space-y-2">
                  <Check className="w-8 h-8 text-green-600 mx-auto" />
                  <p className="text-sm font-medium text-green-700">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="text-sm font-medium text-gray-700">
                    Drop your PDF file here or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF files only, up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 active:scale-95"
            >
              {loading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </form>
      </div>

      {/* Right: PDF Preview */}
      <div className="flex flex-col flex-1 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Document Preview</h2>
        <div className="flex-1 overflow-hidden">
          {previewUrl ? (
            <iframe
              src={previewUrl}
              title="PDF Preview"
              className="w-full h-full border rounded"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 border border-dashed rounded">
              <File className="mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No document selected</p>
              <p className="text-sm text-center px-4">
                Upload a PDF document to see the preview here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
