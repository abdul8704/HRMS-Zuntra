import React, { useState, useEffect, useRef } from "react";

export const AssignmentModule = ({ subModuleId, initialData = [], onChange }) => {
  const [questions, setQuestions] = useState(() =>
    initialData.length > 0
      ? initialData
      : [
          {
            questionText: "",
            options: [],
            correctAnswer: "",
            newOptionText: "",
          },
        ]
  );

  const firstLoad = useRef(true);

  // Load initial data only on first mount OR if it actually changes
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    const initialStr = JSON.stringify(initialData);
    const currentStr = JSON.stringify(questions);
    if (initialStr !== currentStr) {
      setQuestions(
        initialData.length > 0
          ? initialData
          : [
              {
                questionText: "",
                options: [],
                correctAnswer: "",
                newOptionText: "",
              },
            ]
      );
    }
  }, [initialData]);

  // Notify parent about changes
  useEffect(() => {
    onChange?.(questions);
  }, [questions, onChange]);

  const updateQuestionField = (index, key, value) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index][key] = value;
      return updated;
    });
  };

  const addOption = (qIndex) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const question = updated[qIndex];
      if (!question.newOptionText.trim()) return prev;
      question.options.push(question.newOptionText.trim());
      question.newOptionText = "";
      return updated;
    });
  };

  const removeOption = (qIndex, optIndex) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const removed = updated[qIndex].options.splice(optIndex, 1)[0];
      if (updated[qIndex].correctAnswer === removed) {
        updated[qIndex].correctAnswer = "";
      }
      return updated;
    });
  };

  const setCorrectAnswer = (qIndex, option) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[qIndex].correctAnswer = option;
      return updated;
    });
  };

  const isValidQuestion = (q) =>
    q.questionText.trim() !== "" &&
    q.options.length >= 2 &&
    q.correctAnswer.trim() !== "";

  const canAddQuestion = () => isValidQuestion(questions[questions.length - 1]);

  const addNewQuestion = () => {
    if (!canAddQuestion()) return;
    setQuestions((prev) => [
      ...prev,
      {
        questionText: "",
        options: [],
        correctAnswer: "",
        newOptionText: "",
      },
    ]);
  };

  const deleteQuestion = (qIndex) => {
    setQuestions((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== qIndex);
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 mt-6 bg-white rounded-md shadow border space-y-6">
      <div className="border-l-4 border-black-500 pl-3 mb-4">
        <h3 className="text-xl font-semibold text-black-700">Assignment</h3>
      </div>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-6 relative border p-4 rounded bg-gray-50">
          {questions.length > 1 && (
            <button
              onClick={() => deleteQuestion(qIndex)}
              title="Delete Question"
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          )}

          <input
            type="text"
            value={q.questionText}
            onChange={(e) => updateQuestionField(qIndex, "questionText", e.target.value)}
            placeholder={`Enter question ${qIndex + 1}`}
            className="bg-gray-100 p-3 rounded w-full mb-3 border"
          />

          {q.options.map((opt, optIndex) => (
            <div key={optIndex} className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                name={`correct-${subModuleId}-${qIndex}`}
                checked={opt === q.correctAnswer}
                onChange={() => setCorrectAnswer(qIndex, opt)}
              />
              <span className="flex-grow">{opt}</span>
              <button
                onClick={() => removeOption(qIndex, optIndex)}
                className="text-red-600 hover:text-red-800 transition"
                title="Remove Option"
              >
                ✕
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={q.newOptionText}
              onChange={(e) => updateQuestionField(qIndex, "newOptionText", e.target.value)}
              placeholder="Enter an option"
              className="bg-gray-100 p-2 rounded flex-grow border"
            />
            <button
              onClick={() => addOption(qIndex)}
              className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400"
            >
              +
            </button>
            <button
              onClick={addNewQuestion}
              disabled={!canAddQuestion()}
              className={`px-3 py-2 rounded ${
                canAddQuestion()
                  ? "bg-gray-300 hover:bg-gray-400"
                  : "bg-gray-200 cursor-not-allowed"
              }`}
            >
              Add Question
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssignmentModule;
