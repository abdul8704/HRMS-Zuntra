import React from 'react';

export const AssignmentsSection = () => {
  return (
    <div className="p-4">
      <h4 className="flex items-center text-lg font-bold mb-4">
        <span className="w-1 h-5 bg-teal-600 mr-2 rounded-sm" />
        Assignments
      </h4>

      {/* Question 1 */}
      <div className="bg-gray-300 p-4 mb-4 rounded-lg">
        <p className="font-medium mb-2">1. Answer for question 1 is option b. Okay?</p>
        <form>
          <label className="block mb-1 text-sm">
            <input type="radio" name="q1" className="mr-2" /> option 1
          </label>
          <label className="block mb-1 text-sm">
            <input type="radio" name="q1" className="mr-2" /> option 2
          </label>
          <label className="block mb-1 text-sm">
            <input type="radio" name="q1" className="mr-2" defaultChecked /> option 3
          </label>
          <label className="block mb-1 text-sm">
            <input type="radio" name="q1" className="mr-2" /> option 4
          </label>
        </form>
      </div>

      {/* Question 2 */}
      <div className="bg-gray-300 p-4 mb-4 rounded-lg">
        <p className="font-medium mb-2">2. Answer for question 2 is option b. Okay?</p>
        <form>
          <label className="block mb-1 text-sm">
            <input type="radio" name="q2" className="mr-2" defaultChecked /> option 1
          </label>
          <label className="block mb-1 text-sm">
            <input type="radio" name="q2" className="mr-2" /> option 2
          </label>
          <label className="block mb-1 text-sm">
            <input type="radio" name="q2" className="mr-2" /> option 3
          </label>
          <label className="block mb-1 text-sm">
            <input type="radio" name="q2" className="mr-2" /> option 4
          </label>
        </form>
      </div>

      {/* Submit Button */}
      <button className="mt-4 px-6 py-2 border border-teal-600 rounded-full bg-white text-teal-600 font-medium hover:bg-teal-600 hover:text-white transition duration-300">
        Submit
      </button>
    </div>
  );
};
