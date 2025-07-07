import React from "react";

export const SubModulePage = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-6 px-4 font-sans text-gray-800">
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <span className="w-1 h-5 bg-[#2b9c9f] rounded mr-2" />
          <h2 className="text-xl font-semibold">Sub Module 2 Name</h2>
        </div>
        <div className="opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 41 38" fill="#000">
            <path fillOpacity=".5" d="M25.65 37.8a1.35 1.35 0 1 0 0-2.7H8.1a5.4 5.4 0 0 1-5.4-5.4V8.1a5.4 5.4 0 0 1 5.4-5.4h17.55a1.35 1.35 0 0 0 0-2.7H8.1A8.1 8.1 0 0 0 0 8.1v21.6a8.1 8.1 0 0 0 8.1 8.1h17.55Zm3.094-29.306a1.35 1.35 0 0 1 1.912 0l9.45 9.45a1.35 1.35 0 0 1 0 1.912l-9.45 9.45a1.351 1.351 0 1 1-1.912-1.912l7.147-7.144H12.15a1.35 1.35 0 1 1 0-2.7h23.741l-7.147-7.144a1.35 1.35 0 0 1 0-1.912Z" />
          </svg>
        </div>
      </div>

      {/* Video */}
      <div className="mb-6 rounded overflow-hidden bg-gray-100">
        <video controls width="100%">
          <source src="your-video-url.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <span className="w-1 h-4 bg-[#2b9c9f] rounded mr-2" /> Description
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
      </div>

      {/* Assignments */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <span className="w-1 h-4 bg-[#2b9c9f] rounded mr-2" /> Assignments
        </h3>

        {[1, 2].map((q, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm"
          >
            <p className="mb-2">{q}. Answer for question {q} is option b. Okay?</p>
            {["option 1", "option 2", "option 3", "option 4"].map((opt, idx) => (
              <label key={idx} className="block mb-1 text-sm">
                <input type="radio" name={`question-${q}`} value={opt} className="mr-2" />
                {opt}
              </label>
            ))}
          </div>
        ))}

        <button className="mt-4 border border-gray-500 rounded-md px-4 py-2 bg-white font-medium hover:bg-gray-100">
          Submit
        </button>
      </div>
    </div>
  );
};
