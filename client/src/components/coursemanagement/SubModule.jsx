import React from "react";

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
  const handleInputChange = (field, value) => {
    onChange(index, { ...subModule, [field]: value });
  };

  const isError = (field) =>
    submitted && errors.includes(`${field}-${modIndex}-${index}`);

  const isValidVideoUrl = (url) => {
    const pattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|drive\.google\.com|dailymotion\.com|\.mp4|\.mov|\.webm|\.avi)/i;
    return pattern.test(url);
  };

  const isVideoUrlInvalid = submitted && !isValidVideoUrl(subModule.videoUrl);

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
          title={disableDelete ? "Cannot delete the only submodule" : "Delete SubModule"}
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <input
          type="text"
          placeholder="Sub Module Name"
          value={subModule.submoduleTitle}
          onChange={(e) => handleInputChange("submoduleTitle", e.target.value)}
          className={`p-3 bg-gray-100 rounded outline-none ${
            isError("submoduleTitle") ? "border-2 border-red-500" : "border"
          }`}
        />
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Video URL"
            value={subModule.videoUrl}
            onChange={(e) => handleInputChange("videoUrl", e.target.value)}
            className={`p-3 bg-gray-100 rounded outline-none ${
              isError("videoUrl") || isVideoUrlInvalid
                ? "border-2 border-red-500"
                : "border"
            }`}
          />
          {isVideoUrlInvalid && (
            <span className="text-red-500 text-sm mt-1 ml-1">Wrong URL</span>
          )}
        </div>
      </div>

      <textarea
        placeholder="Sub Module Description"
        value={subModule.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        className={`w-full p-3 bg-gray-100 rounded resize-none outline-none ${
          isError("description") ? "border-2 border-red-500" : "border"
        }`}
        rows={3}
      />
    </div>
  );
};

export default SubModule;
