import React, { useState } from "react";

// Mock components for demonstration - replace with your actual components
const AddCourse = ({ courseData, onChange, errors, submitted }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
        <input
          type="text"
          value={courseData.courseName}
          onChange={(e) => onChange({ ...courseData, courseName: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md ${errors.includes('courseName') && submitted ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter course name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Instructor *</label>
        <input
          type="text"
          value={courseData.instructor}
          onChange={(e) => onChange({ ...courseData, instructor: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md ${errors.includes('instructor') && submitted ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter instructor name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course ID *</label>
        <input
          type="text"
          value={courseData.courseId}
          onChange={(e) => onChange({ ...courseData, courseId: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md ${errors.includes('courseId') && submitted ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter course ID"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
        <input
          type="text"
          value={courseData.tags}
          onChange={(e) => onChange({ ...courseData, tags: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter tags (comma separated)"
        />
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Course Description *</label>
      <textarea
        value={courseData.courseDescription}
        onChange={(e) => onChange({ ...courseData, courseDescription: e.target.value })}
        className={`w-full px-3 py-2 border rounded-md h-32 ${errors.includes('courseDescription') && submitted ? 'border-red-500' : 'border-gray-300'}`}
        placeholder="Enter course description"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Intro Video URL</label>
      <input
        type="url"
        value={courseData.introVideoUrl}
        onChange={(e) => onChange({ ...courseData, introVideoUrl: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="Enter video URL"
      />
    </div>
  </div>
);

const Module = ({ index, module, onChange, onDelete, disableDelete, errors, submitted }) => (
  <div className="flex items-center gap-3">
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">Module {index + 1} Title *</label>
      <input
        type="text"
        value={module.moduleTitle}
        onChange={(e) => onChange(index, e.target.value)}
        className={`w-full px-3 py-2 border rounded-md ${errors.includes('moduleTitle') && submitted ? 'border-red-500' : 'border-gray-300'}`}
        placeholder="Enter module title"
      />
    </div>
    {!disableDelete && (
      <button
        onClick={() => onDelete(index)}
        className="mt-6 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Delete
      </button>
    )}
  </div>
);

const SubModule = ({ index, modIndex, subModule, onChange, onDelete, submitted, errors, disableDelete }) => (
  <div className="space-y-3 bg-gray-50 p-3 rounded-md">
    <div className="flex items-center justify-between">
      <h4 className="font-medium text-gray-800">Submodule {index + 1}</h4>
      {!disableDelete && (
        <button
          onClick={() => onDelete(index)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          type="text"
          value={subModule.submoduleTitle}
          onChange={(e) => onChange(index, { ...subModule, submoduleTitle: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md text-sm ${errors.includes('submoduleTitle') && submitted ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Submodule title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Video URL *</label>
        <input
          type="url"
          value={subModule.videoUrl}
          onChange={(e) => onChange(index, { ...subModule, videoUrl: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md text-sm ${errors.includes('videoUrl') && submitted ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Video URL"
        />
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
      <textarea
        value={subModule.description}
        onChange={(e) => onChange(index, { ...subModule, description: e.target.value })}
        className={`w-full px-3 py-2 border rounded-md text-sm h-20 ${errors.includes('description') && submitted ? 'border-red-500' : 'border-gray-300'}`}
        placeholder="Submodule description"
      />
    </div>
  </div>
);

const AssignmentModule = ({ initialQuestions, onAssignmentChange }) => {
  const [questions, setQuestions] = useState(initialQuestions || []);

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: 0
    };
    const updated = [...questions, newQuestion];
    setQuestions(updated);
    onAssignmentChange(updated);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
    onAssignmentChange(updated);
  };

  const deleteQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    onAssignmentChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Assignment Questions</h3>
        <button
          onClick={addQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Question
        </button>
      </div>
      
      {questions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No questions added yet. Click "Add Question" to get started.</p>
        </div>
      ) : (
        questions.map((question, index) => (
          <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-800">Question {index + 1}</h4>
              <button
                onClick={() => deleteQuestion(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                <textarea
                  value={question.question}
                  onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your question"
                  rows="2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Answer Options</label>
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={question.correctAnswer === optIndex}
                        onChange={() => updateQuestion(index, 'correctAnswer', optIndex)}
                        className="text-green-500"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...question.options];
                          newOptions[optIndex] = e.target.value;
                          updateQuestion(index, 'options', newOptions);
                        }}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm"
                        placeholder={`Option ${optIndex + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Progress stepper component
function WizardProgress({ step }) {
  const steps = [
    { label: "Course Info", number: 1 },
    { label: "Modules", number: 2 },
    { label: "Assignments", number: 3 },
    { label: "Review", number: 4 }
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((stepItem, i) => (
        <React.Fragment key={stepItem.label}>
          <div className="flex items-center flex-col gap-2">
            <div 
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-300 ${
                step >= i 
                  ? "bg-green-600 text-white shadow-lg" 
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              {stepItem.number}
            </div>
            <span className={`text-xs font-medium ${step >= i ? 'text-green-600' : 'text-gray-500'}`}>
              {stepItem.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div 
              className={`h-1 w-16 mx-2 rounded transition-all duration-300 ${
                step > i ? "bg-green-600" : "bg-gray-300"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function AddCourseWizard({
  initialCourseInfo,
  initialModules,
}) {
  // 0: Course Info | 1: Modules | 2: Assignments | 3: Review
  const [step, setStep] = useState(0);

  // State for course info
  const [courseInfo, setCourseInfo] = useState(
    initialCourseInfo || {
      courseName: "",
      instructor: "",
      courseId: "",
      courseDescription: "",
      introVideoUrl: "",
      tags: "",
    }
  );

  const [modules, setModules] = useState(
    initialModules || [
      {
        moduleTitle: "",
        subModules: [
          { submoduleTitle: "", videoUrl: "", description: "", assignment: [] },
        ],
      },
    ]
  );
  
  const [errorFields, setErrorFields] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [currentAssignmentIndex, setCurrentAssignmentIndex] = useState({ moduleIdx: 0, subIdx: 0 });

  // Validation functions
  const isCourseInfoValid = () => {
    return ["courseName", "instructor", "courseId", "courseDescription"].every(
      (k) => !!courseInfo[k]
    );
  };

  const isAllModulesValid = () => {
    for (let m = 0; m < modules.length; m++) {
      if (!modules[m].moduleTitle) return false;
      for (let s = 0; s < modules[m].subModules.length; s++) {
        const sub = modules[m].subModules[s];
        if (!sub.submoduleTitle || !sub.videoUrl || !sub.description) return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    setSubmitted(true);
    
    if (step === 0) {
      // Validate course info
      if (isCourseInfoValid()) {
        setStep(1);
        setSubmitted(false);
        setErrorFields([]);
      } else {
        const missingFields = ["courseName", "instructor", "courseId", "courseDescription"]
          .filter(k => !courseInfo[k]);
        setErrorFields(missingFields);
        alert("Please fill all required course information fields!");
      }
    } else if (step === 1) {
      // Validate modules
      if (isAllModulesValid()) {
        setStep(2);
        setSubmitted(false);
        setErrorFields([]);
      } else {
        alert("Please fill all required fields in all modules & submodules!");
      }
    } else if (step === 2) {
      // Go to review
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setSubmitted(false);
      setErrorFields([]);
    }
  };

  const handleSubmit = () => {
    alert("✅ Course submitted successfully!");
    console.log({ courseInfo, modules });
    // Reset or redirect as needed
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="animate-fadeIn">
            <AddCourse
              courseData={courseInfo}
              onChange={setCourseInfo}
              errors={errorFields}
              submitted={submitted}
            />
          </div>
        );

      case 1:
        return (
          <div className="animate-fadeIn">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Course Modules</h2>
              <p className="text-gray-600">Add and organize your course modules and submodules.</p>
            </div>
            
            <div className="space-y-6">
              {modules.map((module, mIdx) => (
                <div key={mIdx} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                  <Module
                    index={mIdx}
                    module={module}
                    onChange={(i, modTitle) => {
                      const updated = [...modules];
                      updated[mIdx].moduleTitle = modTitle;
                      setModules(updated);
                    }}
                    onDelete={(idx) => {
                      if (modules.length <= 1) return;
                      setModules(modules.filter((_, i) => i !== idx));
                    }}
                    disableDelete={modules.length <= 1}
                    errors={errorFields}
                    submitted={submitted}
                  />
                  
                  <div className="mt-4 ml-4 space-y-4">
                    {module.subModules.map((sub, sIdx) => (
                      <SubModule
                        key={sIdx}
                        index={sIdx}
                        modIndex={mIdx}
                        subModule={sub}
                        onChange={(idx, updatedSub) => {
                          const updated = [...modules];
                          updated[mIdx].subModules[sIdx] = updatedSub;
                          setModules(updated);
                        }}
                        onDelete={(idx) => {
                          if (module.subModules.length <= 1) return;
                          const updated = [...modules];
                          updated[mIdx].subModules = module.subModules.filter((_, i) => i !== idx);
                          setModules(updated);
                        }}
                        submitted={submitted}
                        errors={errorFields}
                        disableDelete={module.subModules.length <= 1}
                      />
                    ))}
                    
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                      onClick={() => {
                        const updated = [...modules];
                        updated[mIdx].subModules.push({
                          submoduleTitle: "",
                          videoUrl: "",
                          description: "",
                          assignment: [],
                        });
                        setModules(updated);
                      }}
                    >
                      + Add Submodule
                    </button>
                  </div>
                </div>
              ))}
              
              <button
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                onClick={() =>
                  setModules([
                    ...modules,
                    { 
                      moduleTitle: "", 
                      subModules: [{ 
                        submoduleTitle: "", 
                        videoUrl: "", 
                        description: "", 
                        assignment: [] 
                      }] 
                    },
                  ])
                }
              >
                + Add New Module
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="animate-fadeIn">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Assignment Setup</h2>
              <p className="text-gray-600">Create assignments for your submodules.</p>
            </div>

            <div className="space-y-6">
              {modules.map((module, mIdx) => (
                <div key={mIdx} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                  <h3 className="font-semibold text-lg text-gray-800 mb-4">
                    {module.moduleTitle || `Module ${mIdx + 1}`}
                  </h3>
                  
                  {module.subModules.map((subModule, sIdx) => (
                    <div key={sIdx} className="mb-6 p-4 bg-gray-50 rounded-md">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-700">
                          {subModule.submoduleTitle || `Submodule ${sIdx + 1}`}
                        </h4>
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                          onClick={() => {
                            setCurrentAssignmentIndex({ moduleIdx: mIdx, subIdx: sIdx });
                          }}
                        >
                          {subModule.assignment && subModule.assignment.length > 0 ? 'Edit Assignment' : 'Add Assignment'}
                        </button>
                      </div>
                      
                      {currentAssignmentIndex.moduleIdx === mIdx && currentAssignmentIndex.subIdx === sIdx && (
                        <div className="border-t pt-4">
                          <AssignmentModule
                            initialQuestions={subModule.assignment}
                            onAssignmentChange={(assignment) => {
                              const updated = [...modules];
                              updated[mIdx].subModules[sIdx].assignment = assignment;
                              setModules(updated);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-fadeIn">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Review & Submit</h2>
              <p className="text-gray-600">Review your course details before submitting.</p>
            </div>

            <div className="space-y-6">
              {/* Course Info Summary */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Course Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Name:</strong> {courseInfo.courseName}</div>
                  <div><strong>Instructor:</strong> {courseInfo.instructor}</div>
                  <div><strong>Course ID:</strong> {courseInfo.courseId}</div>
                  <div><strong>Tags:</strong> {courseInfo.tags || 'None'}</div>
                  <div className="col-span-2"><strong>Description:</strong> {courseInfo.courseDescription}</div>
                </div>
              </div>

              {/* Modules Summary */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Course Structure</h3>
                <div className="space-y-3">
                  {modules.map((module, mIdx) => (
                    <div key={mIdx} className="border-l-4 border-green-500 pl-4">
                      <div className="font-medium">{module.moduleTitle}</div>
                      <div className="ml-4 mt-2 space-y-1">
                        {module.subModules.map((sub, sIdx) => (
                          <div key={sIdx} className="text-sm text-gray-600 flex justify-between">
                            <span>• {sub.submoduleTitle}</span>
                            <span>{sub.assignment && sub.assignment.length > 0 ? `${sub.assignment.length} questions` : 'No assignment'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-lg p-8">
        {/* Progress Indicator */}
        <WizardProgress step={step} />

        {/* Main Content Container */}
        <div className="bg-white rounded-lg shadow-sm p-8 min-h-[500px]">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className={`px-6 py-3 rounded-md font-semibold transition-all ${
              step === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            ← Previous
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all"
            >
              {step === 2 ? 'Review →' : 'Next →'}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
            >
              Submit Course
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}