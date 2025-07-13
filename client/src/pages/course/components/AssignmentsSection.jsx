import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const AssignmentsSection = ({ quiz, markProgress }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Reset state when a new quiz/submodule is loaded
  useEffect(() => {
    setSelectedAnswers({});
    setSubmitted(false);
    setShowResults(false);
  }, [quiz]);

  const handleAnswerChange = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResults(true);
    const score = calculateScore();
    if (score === quiz.questions.length && typeof markProgress === 'function') {
      markProgress();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const isAnswerCorrect = (questionIndex, answer) => {
    return answer === quiz.questions[questionIndex].correctAnswer;
  };

  const allQuestionsAnswered = quiz.questions.every((_, index) =>
    selectedAnswers[index] !== undefined
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-teal-600 mr-3 rounded-full" />
        <h4 className="text-xl font-bold text-gray-800">Assignments</h4>
        <div className="ml-auto text-sm text-gray-500">
          {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
        </div>
      </div>

      {showResults && (
        <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-200">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-teal-600 mr-2" />
            <span className="text-lg font-semibold text-teal-800">
              Score: {calculateScore()}/{quiz.questions.length}
            </span>
            <span className="ml-2 text-sm text-teal-600">
              ({Math.round((calculateScore() / quiz.questions.length) * 100)}%)
            </span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {quiz.questions.map((question, questionIndex) => {
          if (!question.questionText || !question.options || !Array.isArray(question.options)) {
            return (
              <div key={questionIndex} className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center text-red-700">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm">
                    Question {questionIndex + 1} has invalid structure
                  </span>
                </div>
              </div>
            );
          }

          if (question.options.length === 0) {
            return (
              <div key={questionIndex} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-medium text-gray-800 mb-2">
                  {questionIndex + 1}. {question.questionText}
                </p>
                <div className="flex items-center text-yellow-700">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm">No options available for this question</span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={questionIndex}
              className={`p-5 rounded-lg border-2 transition-all duration-200 ${
                showResults
                  ? selectedAnswers[questionIndex] === question.correctAnswer
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                  : 'bg-gray-50 border-gray-200 hover:border-teal-300'
              }`}
            >
              <p className="font-semibold text-gray-800 mb-4 text-lg">
                {questionIndex + 1}. {question.questionText}
              </p>

              <div className="space-y-3">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswers[questionIndex] === option;
                  const isCorrect = showResults && isAnswerCorrect(questionIndex, option);
                  const isWrong = showResults && isSelected && !isCorrect;

                  return (
                    <label
                      key={optionIndex}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        submitted ? 'cursor-not-allowed' : 'hover:bg-white hover:shadow-sm'
                      } ${
                        isCorrect
                          ? 'bg-green-100 border-green-300'
                          : isWrong
                          ? 'bg-red-100 border-red-300'
                          : isSelected
                          ? 'bg-teal-100 border-teal-300'
                          : 'bg-white border-gray-200'
                      } border`}
                    >
                      <input
                        type="radio"
                        name={`question_${questionIndex}`}
                        value={option}
                        checked={isSelected}
                        onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
                        disabled={submitted}
                        className="mr-3 text-teal-600 focus:ring-teal-500 disabled:opacity-50"
                      />
                      <span
                        className={`text-sm ${
                          isCorrect
                            ? 'text-green-800 font-medium'
                            : isWrong
                            ? 'text-red-800'
                            : 'text-gray-700'
                        }`}
                      >
                        {option}
                      </span>
                      {showResults && isCorrect && (
                        <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                      )}
                    </label>
                  );
                })}
              </div>

              {showResults &&
                selectedAnswers[questionIndex] !== question.correctAnswer && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-sm text-green-800">
                      <strong>Correct answer:</strong> {question.correctAnswer}
                    </span>
                  </div>
                )}
            </div>
          );
        })}

        {!submitted && (
          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                allQuestionsAnswered
                  ? 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Assignment
            </button>
          </div>
        )}

        {submitted && (
          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setShowResults(false);
                setSelectedAnswers({});
              }}
              className="px-8 py-3 rounded-full font-medium bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
