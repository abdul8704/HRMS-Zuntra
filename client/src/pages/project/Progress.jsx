import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';

const employees = [
  'Jai Atithya A',
  'Kavin Raj',
  'Sundar M',
  'Priya Sharma',
  'Aman Verma',
];

const TaskCard = ({ color, daysLeft, name, description, assignedTo }) => (
  <div
    className={`rounded-2xl shadow-md ${color} flex flex-col justify-between overflow-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
    style={{ width: '100%', maxWidth: '489px', height: '308px', color: '#4d4d4d', padding: '16px' }}
  >
    <div className="overflow-y-auto">
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-lg text-black">{name || 'Task ABCDE'}</h2>
        <label className="flex items-center space-x-1 text-xs bg-white/70 text-gray-700 border border-gray-300 px-2 py-1 rounded-full cursor-pointer">
          <input type="checkbox" className="form-checkbox h-3 w-3" />
          <span>Mark as completed</span>
        </label>
      </div>
      <p className="text-sm">{description || 'This is a sample description for a task.'}</p>
    </div>

    <div className="flex justify-between items-center pt-4 mt-4">
      <div className="flex items-center gap-2">
        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="profile" className="w-8 h-8 rounded-full" />
        <div>
          <div className="text-sm font-semibold text-black">{assignedTo || 'Jai Atithya A'}</div>
          <div className="text-xs text-gray-700 -mt-1">Embedded & IoT Developer</div>
        </div>
      </div>
      <span className="bg-white/60 text-sm text-black px-3 py-1 rounded-full">{daysLeft}</span>
    </div>
  </div>
);

export const Progress = () => {
  const [tasks, setTasks] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      name: '',
      description: '',
      assignedTo: '',
      daysLeft: `${(i % 3 === 0 ? 7 : i % 3 === 1 ? '1 Month' : '3 Month')} left`,
      color: ['bg-red-200', 'bg-yellow-100', 'bg-pink-200', 'bg-green-200', 'bg-stone-200'][i % 5],
    }))
  );

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', description: '', assignedTo: '' });

  const handleAddTask = () => {
    if (!newTask.name.trim() || !newTask.description.trim() || !newTask.assignedTo.trim()) return;
    setTasks([
      ...tasks,
      {
        name: newTask.name,
        description: newTask.description,
        assignedTo: newTask.assignedTo,
        daysLeft: 'New',
        color: ['bg-red-200', 'bg-yellow-100', 'bg-pink-200', 'bg-green-200', 'bg-stone-200'][Math.floor(Math.random() * 5)],
      },
    ]);
    setNewTask({ name: '', description: '', assignedTo: '' });
    setShowForm(false);
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
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

        {/* Floating + Button at Bottom-Right with BBD3CC */}
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 text-white text-3xl rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50"
          style={{ backgroundColor: '#BBD3CC' }}
        >
          +
        </button>

        {/* Task Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Add New Task</h3>

              {/* Task Name */}
              <input
                type="text"
                placeholder="Task Name"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                className="w-full mb-3 p-2 border border-gray-300 rounded"
              />

              {/* Task Description */}
              <textarea
                placeholder="Task Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full mb-3 p-2 border border-gray-300 rounded"
                rows="3"
              />

              {/* Employee Dropdown */}
              <div className="relative">
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded appearance-none bg-white pr-8"
                >
                  <option value="" disabled>Select Employee</option>
                  {employees.map((emp, i) => (
                    <option key={i} value={emp}>{emp}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600">
                  ▼
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-[#BBD3CC] hover:bg-[#a0bfb4] text-white rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
