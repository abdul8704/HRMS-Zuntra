import React, { useState } from "react";

const SubModule = ({
  index,
  modIndex,
  subModule,
  onChange,
  onDelete,
  errors,
  submitted,
  disableDelete = false,
}) => {
  const [videoError, setVideoError] = useState("");
  const [uploadedVideoName, setUploadedVideoName] = useState("");

  const handleInputChange = (field, value) => {
    onChange(index, { ...subModule, [field]: value });
  };

  const isError = (field) =>
    submitted && errors.includes(`${field}-${modIndex}-${index}`);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("video/")) {
      setVideoError("");
      setUploadedVideoName(file.name);
      handleInputChange("videoUrl", URL.createObjectURL(file)); // Temp blob URL
    } else {
      setVideoError("Please upload a valid video file.");
      setUploadedVideoName("");
      handleInputChange("videoUrl", "");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-5xl border border-gray-200">
      <div className="flex justify-between items-center border-l-4 border-blue-500 pl-3 mb-4">
        <h4 className="text-md font-bold text-black">
          Sub Module {index + 1}
        </h4>
        <button
          onClick={onDelete}
          disabled={disableDelete}
          className={`text-lg px-2 py-1 rounded ${
            disableDelete
              ? "text-gray-400 cursor-not-allowed"
              : "text-red-500 hover:text-red-700"
          }`}
          title={
            disableDelete ? "Cannot delete the only submodule" : "Delete SubModule"
          }
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <input
          type="text"
          placeholder="Sub Module Name"
          value={subModule.submoduleTitle}
          onChange={(e) =>
            handleInputChange("submoduleTitle", e.target.value)
          }
          className={`p-3 bg-gray-100 rounded outline-none ${
            isError("submoduleTitle") ? "border-2 border-red-500" : "border"
          }`}
        />

        {/* Upload Video File Input */}
        <div className={`p-2 bg-gray-100 rounded border ${isError("videoUrl") ? "border-red-500" : "border-gray-300"}`}>
          <label className="block text-sm text-gray-700 font-medium mb-1">
            Upload Video
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="text-sm"
          />
          {videoError && <p className="text-red-500 text-xs mt-1">{videoError}</p>}
          {uploadedVideoName && (
            <p className="text-green-600 text-xs mt-1 truncate">
              Uploaded: {uploadedVideoName}
            </p>
          )}
        </div>
      </div>

      <textarea
        placeholder="Sub Module Description"
        value={subModule.description}
        onChange={(e) =>
          handleInputChange("description", e.target.value)
        }
        className={`w-full p-3 bg-gray-100 rounded resize-none outline-none ${
          isError("description") ? "border-2 border-red-500" : "border"
        }`}
        rows={3}
      />
    </div>
  );
};

export default SubModule;
