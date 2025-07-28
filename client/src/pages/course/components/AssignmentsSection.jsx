import React, { useState } from 'react';
import { Plus, X, Check, AlertCircle } from 'lucide-react';

export default function AssignmentCard() {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      selectedAnswer: null,
      correctAnswer: 2
    }
  ]);

  const [nextId, setNextId] = useState(2);

  const addNewQuestion = () => {
    const newQuestion = {
      id: nextId,
      question: "Enter your question here...",
      options: ["Option A", "Option B", "Option C", "Option D"],
      selectedAnswer: null,
      correctAnswer: 0
    };
    setAssignments([...assignments, newQuestion]);
    setNextId(nextId + 1);
  };

  const removeAssignment = (id) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
  };

  const selectAnswer = (assignmentId, optionIndex) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, selectedAnswer: optionIndex }
        : assignment
    ));
  };

  const updateQuestion = (assignmentId, newQuestion) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, question: newQuestion }
        : assignment
    ));
  };

  const updateOption = (assignmentId, optionIndex, newOption) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId 
        ? { 
            ...assignment, 
            options: assignment.options.map((opt, idx) => 
              idx === optionIndex ? newOption : opt
            )
          }
        : assignment
    ));
  };

  const canAddNextQuestion = () => {
    if (assignments.length === 0) return true;
    const lastAssignment = assignments[assignments.length - 1];
    return lastAssignment.selectedAnswer !== null;
  };

  const getValidationMessage = () => {
    if (assignments.length === 0) return null;
    const lastAssignment = assignments[assignments.length - 1];
    if (lastAssignment.selectedAnswer === null) {
      return "Please select an answer to add the next question";
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Assignment Manager</h1>
          <p className="text-gray-600">Create and manage assignment questions with validation</p>
        </div>
        
        {/* Small Add Question Button in Right Corner */}
        <button
          onClick={addNewQuestion}
          disabled={!canAddNextQuestion()}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            canAddNextQuestion()
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          title={canAddNextQuestion() ? "Add new question" : "Select an answer first"}
        >
          <Plus size={16} />
          <span>Add Question</span>
        </button>
      </div>

      <div className="space-y-6">
        {assignments.map((assignment, index) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <h2 className="text-lg font-semibold text-gray-800">Question {index + 1}</h2>
              </div>
              {assignments.length > 1 && (
                <button
                  onClick={() => removeAssignment(assignment.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                  title="Remove assignment"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="mb-4">
              <textarea
                value={assignment.question}
                onChange={(e) => updateQuestion(assignment.id, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="2"
                placeholder="Enter your question here..."
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select the correct answer:
              </label>
              {assignment.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-3">
                  <button
                    onClick={() => selectAnswer(assignment.id, optionIndex)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      assignment.selectedAnswer === optionIndex
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {assignment.selectedAnswer === optionIndex && <Check size={14} />}
                  </button>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(assignment.id, optionIndex, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                  />
                  <span className="text-sm text-gray-500 w-8">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                </div>
              ))}
            </div>

            {assignment.selectedAnswer !== null && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                <Check className="text-green-600" size={16} />
                <span className="text-green-700 text-sm">
                  Answer selected: Option {String.fromCharCode(65 + assignment.selectedAnswer)}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Validation Message */}
        {!canAddNextQuestion() && (
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200">
              <AlertCircle size={16} />
              <span className="text-sm">{getValidationMessage()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}