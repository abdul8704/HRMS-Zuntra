import React, { useState } from "react";


export const AddCoursePage = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="flex min-h-screen bg-[#D6D6D6]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <div className="px-4 py-2">
          <CourseNavbar />
        </div>

        {/* Course form */}
        <div className="p-6 space-y-6 w-full max-w-4xl mx-auto">
          {/* Sub Module Description */}
          <div className="bg-white p-4 rounded-lg shadow">
            <label className="block text-lg font-semibold mb-2">
              Sub Module Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2"
              rows={3}
              placeholder="Enter Sub Module Description"
            ></textarea>
          </div>

          {/* Assignment Question */}
          <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <label className="block text-lg font-semibold mb-2">
              Assignment - Sub Module 1
            </label>

            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="What is the answer for question 1?"
            />

            {/* Options */}
            <div className="space-y-2">
              {options.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 text-base"
                >
                  <input
                    type="radio"
                    name="correctOption"
                    checked={correctOptionIndex === idx}
                    onChange={() => setCorrectOptionIndex(idx)}
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    placeholder={`Option ${idx + 1}`}
                  />
                </label>
              ))}
            </div>

            {/* Add Choice */}
            <div className="flex gap-2">
              <input
                type="text"
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                placeholder="Enter an additional choice"
                disabled
              />
              <button className="px-4 py-1 bg-green-500 text-white rounded-md cursor-not-allowed">
                Add Question
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-4 justify-end pt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                Add Module
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md">
                Add Sub Module
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
