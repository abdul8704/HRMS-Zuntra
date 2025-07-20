import React from "react";

const Summary = ({ formData }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <p><strong>Course Title:</strong> {formData.courseTitle}</p>
      <p><strong>Description:</strong> {formData.description}</p>
      <p><strong>Module:</strong> {formData.moduleTitle}</p>
      <p><strong>SubModule:</strong> {formData.subModuleTitle}</p>
      <p><strong>Assignment:</strong> {formData.assignment}</p>
    </div>
  );
};

export default Summary;
