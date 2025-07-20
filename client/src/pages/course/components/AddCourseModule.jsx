import React from 'react';

export const AddCourseModule = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Course Modules</h2>
        <p className="text-gray-600 mt-2">Add modules to structure your course content</p>
      </div>
      
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Add Your First Module</h3>
        <p className="text-gray-500 mb-4">Start building your course by adding modules</p>
        <button className="bg-[#A6C4BA] hover:bg-[#8fb5a7] text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Add Module
        </button>
      </div>
    </div>
  );
};