import React, { useState, useEffect } from 'react';
import { AddCourseIntro } from './AddCourseIntro';
import { AddCourseNavigator } from './AddCourseNavigator';
import { AddCourseModule } from './AddCourseModule';
import { AddCourseSubModule } from './AddCourseSubModule';
import { AssignmentModule } from './AssignmentModule';
import { Plus } from 'lucide-react';

export const AddCourseMod = () => {
  const [courseData, setCourseData] = useState({
    courseName: '',
    instructorName: '',
    courseDescription: '',
    introVideo: null
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState('Course Intro');
  const [moduleCount, setModuleCount] = useState(0);
  const [moduleNames, setModuleNames] = useState([]);
  const [moduleData, setModuleData] = useState({});
  const [subModuleData, setSubModuleData] = useState({});
  const [assignmentData, setAssignmentData] = useState({});

  const generateAllSteps = () => {
    const steps = ['Course Intro'];
    for (let i = 1; i <= moduleCount; i++) steps.push(`Module ${i}`);
    steps.push('Publish');
    return steps;
  };

  const allSteps = generateAllSteps();

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
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
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
    if (currentStep === 'Course Intro') {
      if (completedSteps.includes('Course Intro')) {
        if (moduleCount === 0) {
          setModuleCount(1);
          setCurrentStep('Module 1');
        } else {
          setCurrentStep('Module 1');
        }
      } else if (validateForm()) {
        setCompletedSteps(prev => [...prev, 'Course Intro']);
        if (moduleCount === 0) {
          setModuleCount(1);
          setCurrentStep('Module 1');
        } else {
          setCurrentStep('Module 1');
        }
      }
    }
  };

  const handleModuleComplete = (moduleStep, moduleFormData) => {
    if (!completedSteps.includes(moduleStep)) {
      setCompletedSteps(prev => [...prev, moduleStep]);
    }
    setModuleData(prev => ({ ...prev, [moduleStep]: moduleFormData }));
    const moduleNumber = parseInt(moduleStep.split(' ')[1]);
    const moduleIndex = moduleNumber - 1;
    setModuleNames(prev => {
      const newModuleNames = [...prev];
      while (newModuleNames.length <= moduleIndex) {
        newModuleNames.push('');
      }
      newModuleNames[moduleIndex] = moduleFormData.moduleName;
      return newModuleNames;
    });
  };

  const handleSubModuleChange = (moduleStep, updatedData) => {
    setSubModuleData(prev => ({
      ...prev,
      [moduleStep]: updatedData
    }));
  };

  const handleAssignmentChange = (moduleStep, updatedData) => {
    setAssignmentData(prev => ({
      ...prev,
      [moduleStep]: updatedData
    }));
  };

  const handleModuleNext = (moduleStep) => {
    const currentModuleNumber = parseInt(moduleStep.split(' ')[1]);
    const nextModuleStep = `Module ${currentModuleNumber + 1}`;
    if (allSteps.includes(nextModuleStep)) {
      setCurrentStep(nextModuleStep);
    }
  };

  const handleStepClick = (step) => {
    if (completedSteps.includes(step) || step === currentStep) {
      setCurrentStep(step);
      setErrors({});
    } else if (step.startsWith('Module') && completedSteps.includes('Course Intro')) {
      const moduleNumber = parseInt(step.split(' ')[1]);
      if (moduleNumber <= moduleCount) {
        setCurrentStep(step);
        setErrors({});
      }
    } else if (step === 'Publish' && completedSteps.some(s => s.startsWith('Module'))) {
      setCurrentStep(step);
      setErrors({});
    }
  };

  const addNewModule = () => {
    const newModuleNumber = moduleCount + 1;
    setModuleCount(newModuleNumber);
    setCurrentStep(`Module ${newModuleNumber}`);
  };

  const isCourseIntroDisabled = () => completedSteps.includes('Course Intro');

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
          moduleNames={moduleNames}
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
            onNext={handleNext}
            isFormComplete={isFormComplete() || completedSteps.includes('Course Intro')}
            disabled={isCourseIntroDisabled()}
            isStepCompleted={completedSteps.includes('Course Intro')}
          />
        )}

        {currentStep.startsWith('Module') && (
          <>
            <AddCourseModule
              moduleNumber={currentStep.split(' ')[1]}
              onNext={() => handleModuleNext(currentStep)}
              onComplete={(moduleFormData) => handleModuleComplete(currentStep, moduleFormData)}
              disabled={completedSteps.includes(currentStep)}
              initialData={moduleData[currentStep] || { moduleName: '' }}
              type={completedSteps.includes(currentStep) ? 'review' : 'new'}
            />

            {completedSteps.includes(currentStep) && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Add SubModules for {currentStep}</h2>
                <AddCourseSubModule
                  initialData={subModuleData[currentStep] || []}
                  onChange={(updatedData) => handleSubModuleChange(currentStep, updatedData)}
                />
                <h3 className="text-lg font-medium mt-6 mb-2">Assignments for {currentStep}</h3>
                <AssignmentModule
                  initialData={assignmentData[currentStep] || []}
                  onChange={(updatedData) => handleAssignmentChange(currentStep, updatedData)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

