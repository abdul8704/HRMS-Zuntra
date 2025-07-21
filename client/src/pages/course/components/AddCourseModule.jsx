import React, { useState, useEffect } from 'react';

export const AddCourseModule = ({
  moduleNumber,
  onNext = () => {},
  onComplete = () => {},
  disabled = false,
  initialData = { moduleName: '' },
  type = 'new' // 'new' or 'review'
}) => {
  const [moduleData, setModuleData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isCompleted, setIsCompleted] = useState(type === 'review');

  // Update local state when initialData changes
  useEffect(() => {
    setModuleData(initialData);
    setIsCompleted(type === 'review');
  }, [initialData, type]);

  const handleModuleChange = (field, value) => {
    if (type === 'review') return; // Don't allow changes in review mode
    
    setModuleData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const isFormComplete = () => moduleData.moduleName.trim() !== '';

  const validateForm = () => {
    const newErrors = {};
    if (!moduleData.moduleName.trim()) {
      newErrors.moduleName = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (type === 'review') {
      onNext(); // Just proceed to next step in review mode
      return;
    }

    if (validateForm()) {
      setIsCompleted(true);
      onComplete(moduleData); // pass data if needed
      onNext(); // go to next step
    }
  };

  if (type === 'review') {
    return (
      <>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Module {moduleNumber}</h2>
          <p className="text-gray-600 mt-2">Review module details</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Module Name
            </label>
            <div className="w-full px-4 py-3 border border-green-300 bg-green-50 rounded-lg text-gray-700">
              {moduleData.moduleName || `Module ${moduleNumber} (No name set)`}
            </div>
            <p className="text-green-600 text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Module completed successfully!
            </p>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">Module {moduleNumber} Completed!</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Default 'new' type behavior
  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Module {moduleNumber}</h2>
        <p className="text-gray-600 mt-2">Enter the name for this course module</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Module Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={moduleData.moduleName}
            onChange={(e) => handleModuleChange('moduleName', e.target.value)}
            placeholder={`Enter name for Module ${moduleNumber}`}
            disabled={disabled || isCompleted}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.moduleName
                ? 'border-red-500 focus:ring-red-500'
                : isCompleted
                ? 'border-green-300 bg-green-50'
                : 'border-gray-300 focus:ring-[#A6C4BA]'
            }`}
          />
          {errors.moduleName && (
            <p className="text-red-500 text-sm">Module name is required</p>
          )}
          {isCompleted && (
            <p className="text-green-600 text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Module completed successfully!
            </p>
          )}
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          {!isCompleted ? (
            <button
              onClick={handleNext}
              disabled={!isFormComplete() || disabled}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                isFormComplete() && !disabled
                  ? 'bg-[#A6C4BA] hover:bg-[#8fb5a7] text-white shadow-md hover:shadow-lg transform hover:scale-[1.02]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Complete Module
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-3 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">Module {moduleNumber} Completed!</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};