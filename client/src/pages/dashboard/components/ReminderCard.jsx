import React, { useState } from "react";

export const ReminderCard = ({ onPlusClick }) => {
  const [reminders, setReminders] = useState([
    { id: 1, text: "Today is payroll day, must have to give pay to employee's 1", daysLeft: 2, completed: false },
    { id: 2, text: "Today is payroll day, must have to give pay to employee's 2", daysLeft: 5, completed: false },
    { id: 3, text: "Today is payroll day, must have to give pay to employee's 3", daysLeft: 1, completed: false },
    { id: 4, text: "Today is payroll day, must have to give pay to employee's 4", daysLeft: 3, completed: false },
    { id: 5, text: "Today is payroll day, must have to give pay to employee's 5", daysLeft: 2, completed: false },
    { id: 6, text: "Today is payroll day, must have to give pay to employee's 6", daysLeft: 5, completed: false },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [nextId, setNextId] = useState(7);

  const toggleComplete = (id) => {
    setReminders(prevReminders =>
      prevReminders.map(reminder =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );

    setTimeout(() => {
      setReminders(prevReminders => {
        const idx = prevReminders.findIndex(r => r.id === id);
        if (idx === -1) return prevReminders;

        const updated = [...prevReminders];
        const [item] = updated.splice(idx, 1);

        if (item.completed) {
          updated.push(item); // move to bottom if completed
        } else {
          updated.unshift(item); // move back to top if uncompleted
        }

        return updated;
      });
    }, 1000);
  };

  const handleAddClick = () => setShowForm(prev => !prev);

  const handleDateSelect = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime("");
  };

  const handleSubmit = () => {
    if (!newTask || !selectedDate || !selectedTime) return;

    const selected = new Date(`${selectedDate}T${selectedTime}`);
    const now = new Date();
    const daysLeft = Math.ceil((selected - now) / (1000 * 60 * 60 * 24));

    const newReminder = {
      id: nextId,
      text: newTask,
      daysLeft: Math.max(daysLeft, 0),
      completed: false,
    };

    setReminders([...reminders, newReminder]);
    setNextId(nextId + 1);
    setNewTask("");
    setSelectedDate("");
    setSelectedTime("");
    setShowForm(false);
  };

  // Inline animation styles
  const strikeBase = {
    position: "relative",
    display: "inline-block",
  };

  const strikeLine = (completed) => ({
    content: "''",
    position: "absolute",
    left: 0,
    top: "50%",
    height: "2px",
    background: "currentColor",
    transformOrigin: "left center",
    width: completed ? "100%" : "0%",
    transition: "width 0.3s ease",
  });

  return (
    <div className="w-full h-full rounded-2xl flex flex-col text-[clamp(0.7rem,1.2vw,1rem)] p-[clamp(0.5rem,1vw,1rem)]">
      {/* Header */}
      <div className="flex items-center justify-between font-semibold text-[1.1rem] mb-2">
        <span className="font-semibold text-gray-800 text-[clamp(0.9rem,1.5vw,0.3rem)]">Reminder</span>
        <button
          onClick={handleAddClick}
          className="cursor-pointer p-1 hover:scale-110 transition-transform duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="#1E1E1E" d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0Zm0 1.846A10.14 10.14 0 0 1 22.154 12 10.14 10.14 0 0 1 12 22.154 10.14 10.14 0 0 1 1.846 12 10.14 10.14 0 0 1 12 1.846Zm-.923 4.616v4.615H6.462v1.846h4.615v4.615h1.846v-4.615h4.615v-1.846h-4.615V6.462h-1.846Z" />
          </svg>
        </button>
      </div>

      {/* Add Reminder Form */}
      {showForm && (
        <div className="bg-gray-100 bg-opacity-40 rounded-xl p-2 mb-4 space-y-1 animate-fade-in max-h-[11rem] overflow-y-auto z-10">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task"
            className="w-full px-2 py-1 rounded border border-gray-300 bg-white bg-opacity-50 text-black text-sm"
          />
          <div className="flex justify-between items-center flex-wrap mb-2">
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="w-[125px] bg-white border border-gray-300 rounded-md py-1 px-2 text-xs opacity-70"
                value={selectedDate}
                onChange={handleDateSelect}
              />
              {selectedDate && (
                <input
                  type="time"
                  className="w-[90px] bg-white border border-gray-300 rounded-md py-1 px-2 text-xs opacity-70"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-6 h-6 flex items-center justify-center rounded-full border-[2.5px] border-black/50 bg-transparent hover:bg-white/10 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-black/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={4}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Reminders List */}
      <div className="flex-1 overflow-y-auto pl-1 pr-2">
        <ul className="m-0">
          {reminders.map((reminder) => (
            <li key={reminder.id} className="mb-3 flex items-start gap-2 text-gray-700 text-[clamp(0.7rem,1.1vw,0.9rem)]">
              <button
                onClick={() => toggleComplete(reminder.id)}
                className={`min-w-[20px] min-h-[20px] mt-1 flex items-center justify-center rounded-full border-[2px] transition-all ${
                  reminder.completed ? "border-gray-500 bg-gray-200" : "border-gray-800"
                }`}
              >
                {reminder.completed && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-gray-800"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <div className="flex-1 flex justify-between items-start gap-2">
                <span style={strikeBase}>
                  {reminder.text}
                  <span style={strikeLine(reminder.completed)} />
                </span>
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
