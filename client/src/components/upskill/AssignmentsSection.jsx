import React from 'react';

export const AssignmentsSection = ({ quiz }) => {
  if (!quiz || !quiz.questions) return null;

  return (
    <div className="p-4">
      <h4 className="flex items-center text-lg font-bold mb-4">
        <span className="w-1 h-5 bg-teal-600 mr-2 rounded-sm" />
        Assignments
      </h4>

      {quiz.questions.map((q, idx) => (
        <div key={idx} className="bg-gray-300 p-4 mb-4 rounded-lg">
          <p className="font-medium mb-2">
            {idx + 1}. {q.questionText}
          </p>
          <form>
            {q.options.map((option, i) => (
              <label key={i} className="block mb-1 text-sm">
                <input type="radio" name={`q${idx}`} className="mr-2" />
                {option}
              </label>
            ))}
          </form>
        </div>
      ))}

      <button className="mt-4 px-6 py-2 border border-teal-600 rounded-full bg-white text-teal-600 font-medium hover:bg-teal-600 hover:text-white transition duration-300">
        Submit
      </button>
    </div>
  );
};

