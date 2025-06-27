import React from "react";

const AddModuleButtons = ({ onAddModule, onAddSubModule }) => {
  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={onAddModule}
        className="bg-gray-500 text-white px-6 py-2 rounded w-48 hover:bg-gray-600"
      >
        Add Module
      </button>
      <button
        onClick={onAddSubModule}
        className="bg-gray-500 text-white px-6 py-2 rounded w-48 hover:bg-gray-600"
      >
        Add Sub Module
      </button>
    </div>
  );
};

export default AddModuleButtons;
