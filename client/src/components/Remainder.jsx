import React, { useState } from 'react'
import { Plus } from 'lucide-react'

export const Remainder = ({ onAddReminder }) => {
  const [reminders, setReminders] = useState([
    'Complete project proposal by Friday',
    'Call dentist for appointment',
    'Buy groceries for the weekend',
    'Review quarterly reports',
    'Schedule team meeting for next week',
    'Pay electricity bill',
    'Submit expense reports'
  ]);

  const handleAddReminder = () => {
    if (onAddReminder) onAddReminder(); // Call the prop function
  };

  return (
    <>
      <div className="remainder-container">
        {/* Header */}
        <div className="remainder-header">
          <h1 className="remainder-title">Remainder</h1>
          <button 
            onClick={handleAddReminder}
            className="remainder-add-btn"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Reminders List */}
        <div className="remainder-content">
          <ul className="remainder-list">
            {reminders.map((reminder, index) => (
              <li key={index} className="remainder-item">
                <div className="remainder-bullet"></div>
                <span className="remainder-text">{reminder}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    <style>{`
        .remainder-container {
  width: 100%;
  height: 100%;
  background-color:  #BFBFF7;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
}

.remainder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 1rem ;
}

.remainder-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}

.remainder-add-btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.1rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.remainder-add-btn:hover {
  background-color: #2563eb;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.remainder-content {
  flex: 1;
  margin-right: 1rem;
  overflow-y: auto;
}

.remainder-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.remainder-item {
  display: flex;
  align-items: flex-start;
  padding-left: 2rem;
  gap: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.15s ease;
}

.remainder-bullet {
  width: 8px;
  height: 8px;
  background-color: #3b82f6;
  border-radius: 50%;
  margin-top: 8px;
  flex-shrink: 0;
}

.remainder-text {
  color: #374151;
  line-height: 1.5;
  flex: 1;
}    
    `}</style>
</>
  )
}