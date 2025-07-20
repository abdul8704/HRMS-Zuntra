import React from 'react';

export const AddCourseNavigator = ({
  allSteps = [],
  completedSteps = [],
  currentStep = '',
  onStepClick = () => {},
  onAddModule = () => {},
  canAddModule = false,
}) => {
  // Show ALL steps that have been created
  const getVisibleSteps = () => {
    const currentStepIndex = allSteps.indexOf(currentStep);
    
    // Show all steps up to and including current step
    // Plus show Submodules and Publish only if at least one module is completed
    const visibleSteps = [];
    
    // Always show Course Intro
    visibleSteps.push('Course Intro');
    
    // Show all modules that exist
    const moduleSteps = allSteps.filter(step => step.startsWith('Module'));
    visibleSteps.push(...moduleSteps);
    
    // Show Submodules and Publish only if we have completed at least one module
    const hasCompletedModule = completedSteps.some(step => step.startsWith('Module'));
    if (hasCompletedModule || currentStep === 'Submodules' || currentStep === 'Publish') {
      if (allSteps.includes('Submodules')) visibleSteps.push('Submodules');
      if (allSteps.includes('Publish')) visibleSteps.push('Publish');
    }
    
    // Return in the correct order
    return visibleSteps.filter(step => allSteps.includes(step))
                     .sort((a, b) => allSteps.indexOf(a) - allSteps.indexOf(b));
  };

  const visibleSteps = getVisibleSteps();

  const isStepClickable = (step) => {
    // Allow clicking on completed steps or current step
    return completedSteps.includes(step) || step === currentStep;
  };

  // Check if we should show "Add Module" button - show it after Course Intro is completed
  const shouldShowAddModule = () => {
    return completedSteps.includes('Course Intro');
  };

  return (
    <div className="bg-[#f9f9f9] h-full p-4 rounded-lg shadow-md w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Course Steps</h3>

      <ul className="space-y-3">
        {visibleSteps.map((step, index) => {
          const isCurrent = step === currentStep;
          const isCompleted = completedSteps.includes(step);
          const isClickable = isStepClickable(step);
          
          return (
            <li
              key={step}
              onClick={() => isClickable && onStepClick(step)}
              className={`px-4 py-2 rounded-lg shadow-sm border transition-colors ${
                isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              } ${
                isCurrent
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : isCompleted
                  ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{step}</span>
                {isCompleted && (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isCurrent && !isCompleted && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Add Module Button */}
      {shouldShowAddModule() && (
        <div className="mt-6 pt-4 border-t border-gray-300">
          <button
            onClick={onAddModule}
            className="w-full px-4 py-2 bg-[#A6C4BA] hover:bg-[#8fb5a7] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Module
          </button>
        </div>
      )}

    </div>
  );
};