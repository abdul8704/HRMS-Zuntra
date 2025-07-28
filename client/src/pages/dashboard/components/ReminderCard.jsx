import React, { useState } from "react";

export const ReminderCard = ({ onPlusClick }) => {
  const [reminders, setReminders] = useState([
    { text: "Today is payroll day, must have to give pay to employee’s 1", daysLeft: 2, completed: false },
    { text: "Today is payroll day, must have to give pay to employee’s 2", daysLeft: 5, completed: false },
    { text: "Today is payroll day, must have to give pay to employee’s 3", daysLeft: 1, completed: false },
    { text: "Today is payroll day, must have to give pay to employee’s 4", daysLeft: 3, completed: false },
    { text: "Today is payroll day, must have to give pay to employee’s 5", daysLeft: 2, completed: false },
    { text: "Today is payroll day, must have to give pay to employee’s 6", daysLeft: 5, completed: false },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const toggleComplete = (index) => {
    const updated = [...reminders];
    updated[index].completed = !updated[index].completed;
    setReminders(updated);
  };

  const sortedReminders = [...reminders].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed - b.completed;
    return a.daysLeft - b.daysLeft;
  });

  const handleAddClick = () => setShowForm(true);

  const handleDateSelect = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime(""); // reset time when date changes
  };

  const handleSubmit = () => {
    if (!newTask || !selectedDate || !selectedTime) return;

    const selected = new Date(`${selectedDate}T${selectedTime}`);
    const now = new Date();
    const daysLeft = Math.ceil((selected - now) / (1000 * 60 * 60 * 24));

    const newReminder = {
      text: newTask,
      daysLeft: Math.max(daysLeft, 0),
      completed: false,
    };

    setReminders([...reminders, newReminder]);
    setNewTask("");
    setSelectedDate("");
    setSelectedTime("");
    setShowForm(false);
  };

  return (
    <div className="w-full h-full rounded-2xl flex flex-col text-[clamp(0.7rem,1.2vw,1rem)] p-[clamp(0.5rem,1vw,1rem)]">
      <div className="flex items-center justify-between font-semibold text-[1.1rem] mb-2">
        <span className="font-semibold text-gray-800 text-[clamp(0.9rem,1.5vw,0.3rem)]">Reminder</span>
        <button
          onClick={handleAddClick}
          className="cursor-pointer p-1 hover:scale-110 transition-transform duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="#1E1E1E" d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0Zm0 1.846A10.14 10.14 0 0 1 22.154 12 10.14 10.14 0 0 1 12 22.154 10.14 10.14 0 0 1 1.846 12 10.14 10.14 0 0 1 12 1.846Zm-.923 4.616v4.615H6.462v1.846h4.615v4.615h1.846v-4.615h4.615v-1.846h-4.615V6.462h-1.846Z"/>
          </svg>
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-100 rounded-xl p-3 mb-4 space-y-2 animate-fade-in">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task"
            className="w-full px-2 py-1 rounded border border-gray-300"
          />
          <div className="flex items-center gap-2">
            <button onClick={() => setSelectedDate(new Date().toISOString().split("T")[0])} className="text-sm text-blue-600">Today</button>
            <button onClick={() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              setSelectedDate(tomorrow.toISOString().split("T")[0]);
            }} className="text-sm text-blue-600">Tomorrow</button>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateSelect}
              className="text-sm border rounded px-1"
            />
            {selectedDate && (
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="text-sm border rounded px-1"
              />
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Add Reminder
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto pl-1 pr-2">
        <ul className="m-0">
          {sortedReminders.map((reminder, index) => (
            <li key={index} className="mb-3 flex items-start gap-2 text-gray-700 text-[clamp(0.7rem,1.1vw,0.9rem)]">
              <div
                onClick={() => toggleComplete(reminders.indexOf(reminder))}
                className={`w-4 h-4 mt-1 flex items-center justify-center rounded-full border-[2px] ${reminder.completed ? "border-gray-500" : "border-gray-800"} cursor-pointer`}
              >
                {reminder.completed && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex-1 flex justify-between items-start gap-2">
                <p className={`break-words ${reminder.completed ? "line-through text-gray-600" : "text-gray-800"}`}>{reminder.text}</p>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {reminder.daysLeft} {reminder.daysLeft === 1 ? "day" : "days"} left
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
