import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';

const tasks = Array.from({ length: 20 }, (_, i) => ({
  daysLeft: `${(i % 3 === 0 ? 7 : i % 3 === 1 ? '1 Month' : '3 Month')} left`,
  color: ['bg-red-200', 'bg-yellow-100', 'bg-pink-200', 'bg-green-200', 'bg-stone-200'][i % 5],
}));

const TaskCard = ({ color, daysLeft }) => (
    <div
    className={`rounded-2xl shadow-md ${color} flex flex-col justify-between overflow-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
    style={{ width: '100%', maxWidth: '489px', height: '308px', color: '#4d4d4d', padding: '16px' }}
  >
    {/* Top Section */}
    <div className="overflow-y-auto">
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-lg text-black">Task ABCDE</h2>
        <label className="flex items-center space-x-1 text-xs bg-white/70 text-gray-700 border border-gray-300 px-2 py-1 rounded-full cursor-pointer">
          <input type="checkbox" className="form-checkbox h-3 w-3" />
          <span>Mark as completed</span>
        </label>
      </div>

      <p className="text-sm">
        This is a sample description for a task. I am typing more since there should be more lines.
        One more line and we’re good to go. Huhh, more lines since they want this to overflow.
      </p>
    </div>

    {/* Bottom Section - Always at bottom */}
    <div className="flex justify-between items-center pt-4 mt-4">
      <div className="flex items-center gap-2">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div className="text-sm font-semibold text-black">Jai Atithya A</div>
          <div className="text-xs text-gray-700 -mt-1">Embedded & IoT Developer</div>
        </div>
      </div>
      <span className="bg-white/60 text-sm text-black px-3 py-1 rounded-full">
        {daysLeft}
      </span>
    </div>
  </div>
);

export const Progress = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="p-4 flex-1 overflow-y-scroll bg-gray-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {tasks.map((task, index) => (
              <TaskCard key={index} {...task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

