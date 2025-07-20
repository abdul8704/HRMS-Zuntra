import React from "react";

const SubModuleStep = ({ formData, setFormData }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">SubModule Details</h2>
      <input
        type="text"
        placeholder="SubModule Title"
        value={formData.subModuleTitle}
        onChange={(e) => setFormData({ ...formData, subModuleTitle: e.target.value })}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SubModuleStep;
