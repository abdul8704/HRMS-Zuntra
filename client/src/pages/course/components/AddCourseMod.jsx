import React, { useState } from 'react';
import { AddCourseIntro } from './AddCourseIntro';
import { AddCourseNavigator } from './AddCourseNavigator';
import { AddCourseModule } from './AddCourseModule'; // Placeholder for now

export const AddCourseMod = () => {
  const [courseData, setCourseData] = useState({
    courseName: '',
    instructorName: '',
    courseDescription: '',
    introVideo: null
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  
  // Dynamic step management
  const [completedSteps, setCompletedSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState('Course Intro');
  const [moduleCount, setModuleCount] = useState(0); // Track how many modules have been added
  
  // Generate dynamic steps based on modules added
  const generateAllSteps = () => {
    const steps = ['Course Intro'];
    
    // Add all the modules that have been created
    for (let i = 1; i <= moduleCount; i++) {
      steps.push(`Module ${i}`);
    }
    
    // Add final steps
    steps.push('Submodules', 'Publish');
    
    return steps;
  };

  const handleInputChange = (field, value) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('video/')) {
      setCourseData(prev => ({ ...prev, introVideo: file }));
      if (errors.introVideo) setErrors(prev => ({ ...prev, introVideo: false }));
    } else {
      alert('Please upload a valid video file');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
  };

  const removeVideo = () => {
    setCourseData(prev => ({ ...prev, introVideo: null }));
  };

  const isFormComplete = () => {
    return (
      courseData.courseName.trim() &&
      courseData.instructorName.trim() &&
      courseData.courseDescription.trim() &&
      courseData.introVideo
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!courseData.courseName.trim()) newErrors.courseName = true;
    if (!courseData.instructorName.trim()) newErrors.instructorName = true;
    if (!courseData.courseDescription.trim()) newErrors.courseDescription = true;
    if (!courseData.introVideo) newErrors.introVideo = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 'Course Intro' && validateForm()) {
      if (!completedSteps.includes('Course Intro')) {
        setCompletedSteps(prev => [...prev, 'Course Intro']);
      }
      
      // If no modules exist yet, create the first one
      if (moduleCount === 0) {
        setModuleCount(1);
        setCurrentStep('Module 1');
      } else {
        setCurrentStep('Module 1');
      }
    }
  };

  const handleStepClick = (step) => {
    // Allow navigation to completed steps or current step
    if (completedSteps.includes(step) || step === currentStep) {
      setCurrentStep(step);
      // Clear any validation errors when navigating
      setErrors({});
    }
  };

  const addNewModule = () => {
    const newModuleNumber = moduleCount + 1;
    setModuleCount(newModuleNumber);
    setCurrentStep(`Module ${newModuleNumber}`);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const allSteps = generateAllSteps();

  return (
    <div className="flex w-full h-full gap-4">
      <div className="w-64">
        <AddCourseNavigator
          allSteps={allSteps}
          completedSteps={completedSteps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
          onAddModule={addNewModule}
          canAddModule={completedSteps.includes('Course Intro')}
        />
      </div>

      <div className="flex-1 max-w-5xl mx-auto bg-white rounded-lg p-6 shadow-lg overflow-y-auto">
        {currentStep === 'Course Intro' && (
          <AddCourseIntro
            courseData={courseData}
            errors={errors}
            dragActive={dragActive}
            handleInputChange={handleInputChange}
            handleFileInputChange={handleFileInputChange}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            removeVideo={removeVideo}
            formatFileSize={formatFileSize}
            onNext={handleNext}
            isFormComplete={isFormComplete()}
            disabled={false}
          />
        )}

        {currentStep.startsWith('Module') && (
          <AddCourseModule
            moduleNumber={currentStep.split(' ')[1]}
            onNext={() => {
              // Mark current module as completed
              if (!completedSteps.includes(currentStep)) {
                setCompletedSteps(prev => [...prev, currentStep]);
              }
            }}
            onComplete={() => {
              // Mark current module as completed when user finishes it
              if (!completedSteps.includes(currentStep)) {
                setCompletedSteps(prev => [...prev, currentStep]);
              }
            }}
          />
        )}

        {currentStep === 'Submodules' && (
          <div>
            <h2>Submodules Step</h2>
            <p>Add submodules content here...</p>
          </div>
        )}

        {currentStep === 'Publish' && (
          <div>
            <h2>Publish Step</h2>
            <p>Publish course content here...</p>
          </div>
        )}
      </div>
    </div>
  );
};