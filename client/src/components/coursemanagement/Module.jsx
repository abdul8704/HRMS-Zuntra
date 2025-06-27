import React from "react";

const Module = ({
  moduleTitle,
  onChange,
  isError,
  moduleNumber,
  onDelete,
  disableDelete = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-5xl mb-4 border border-gray-200">
      <div className="flex justify-between items-center border-l-4 border-cyan-500 pl-3 mb-4">
        <h3 className="text-md font-bold text-black">Module {moduleNumber}</h3>
        <button
          onClick={onDelete}
          disabled={disableDelete}
          className={`text-lg px-2 py-1 rounded ${
            disableDelete
              ? "text-gray-400 cursor-not-allowed"
              : "text-red-500 hover:text-red-700"
          }`}
          title={disableDelete ? "Cannot delete the only module" : "Delete Module"}
        >
          ✕
        </button>
      </div>
      <input
        type="text"
        value={moduleTitle}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Module Title"
        className={`w-full p-3 bg-gray-100 rounded outline-none ${
          isError ? "border-2 border-red-500" : "border"
        }`}
      />
    </div>
  );
};

export default Module;
