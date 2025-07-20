import React from "react";

const ModuleStep = ({ formData, setFormData }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Module Details</h2>
      <input
        type="text"
        placeholder="Module Title"
        value={formData.moduleTitle}
        onChange={(e) => setFormData({ ...formData, moduleTitle: e.target.value })}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default ModuleStep;
