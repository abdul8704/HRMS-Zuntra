import React from 'react';

export const AddCourseNavigator = ({
  allSteps = [],
  completedSteps = [],
  currentStep = '',
  onStepClick = () => {},
  onAddModule = () => {},
  canAddModule = false,
  moduleNames = [], // New prop for module names
}) => {
  // Show ALL steps that have been created
  const getVisibleSteps = () => {
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
    // Course Intro is always clickable
    if (step === 'Course Intro') return true;
    
    // Current step is always clickable
    if (step === currentStep) return true;
    
    // Completed steps are always clickable
    if (completedSteps.includes(step)) return true;
    
    // Module steps are clickable if Course Intro is completed
    if (step.startsWith('Module') && completedSteps.includes('Course Intro')) {
      return true;
    }
    
    // Submodules is clickable if at least one module is completed
    if (step === 'Submodules' && completedSteps.some(s => s.startsWith('Module'))) {
      return true;
    }
    
    // Publish is clickable if Submodules is completed
    if (step === 'Publish' && completedSteps.includes('Submodules')) {
      return true;
    }
    
    return false;
  };

  // Check if we should show "Add Module" button - show it after Course Intro is completed
  const shouldShowAddModule = () => {
    return completedSteps.includes('Course Intro');
  };

  // Function to get display name for a step
  const getStepDisplayName = (step) => {
    if (step.startsWith('Module')) {
      const moduleNumber = parseInt(step.split(' ')[1]);
      const moduleIndex = moduleNumber - 1;
      const moduleName = moduleNames[moduleIndex];
      
      if (moduleName) {
        return `${step}: ${moduleName}`;
      }
    }
    return step;
  };

  return (
    <div className="bg-[#f9f9f9] h-full p-4 rounded-lg shadow-md w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Course Steps</h3>

      <ul className="space-y-3">
        {visibleSteps.map((step, index) => {
          const isCurrent = step === currentStep;
          const isCompleted = completedSteps.includes(step);
          const isClickable = isStepClickable(step);
          const displayName = getStepDisplayName(step);
          
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
                  : isClickable
                  ? 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  : 'bg-gray-100 text-gray-500 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm leading-tight">{displayName}</span>
                {isCompleted && (
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isCurrent && !isCompleted && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Add Module Button */}
      

    </div>
  );
};