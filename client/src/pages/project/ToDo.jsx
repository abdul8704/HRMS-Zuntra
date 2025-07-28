import React, { useState } from 'react';
import {
  Check,
  Edit2,
  Trash2,
  Plus
} from 'lucide-react';
import { Sidebar } from '../../components/Sidebar'; // ✅ Adjust path if needed

export const ToDo = () => {
  const [activeTab, setActiveTab] = useState('To-do');
 
  const TaskCard = ({ task, color }) => (
    <div className={`${color} rounded-2xl p-6 mb-6 shadow-sm border border-[#e2e8f0] min-h-[220px]`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-[#1E1E1E] text-base md:text-lg">{task.title}</h3>
        <div className="flex gap-2">
          <Check className="w-4 h-4 text-green-600 cursor-pointer" />
          <Edit2 className="w-4 h-4 text-gray-600 cursor-pointer" />
          <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
        </div>
      </div>

      <p className="text-sm text-[#3F3F3F] mb-4 leading-relaxed">
        {task.description}
      </p>

      {task.assignee && (
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <img
              src={`/avatars/${task.assignee}.jpg`}
              alt={task.assignee}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-medium text-[#1E1E1E]">{task.assignee}</div>
              <div className="text-xs text-[#64748B]">{task.role}</div>
            </div>
          </div>
          <div className="text-sm text-gray-800 font-medium">
            {task.timeLeft}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <TaskCard
              task={{
                title: "Task ABCDE",
                description:
                  "This is a sample description for a task. I am typing more since there should be more lines. One more line and we're good to go. Huhh, more lines since they want this to overflow.",
                assignee: "Jai Adithya A",
                role: "Embedded & IoT Developer",
                timeLeft: "7 days left"
              }}
              color="bg-[#FCDCDC]"
            />

            <TaskCard
              task={{
                title: "Task ABCDE",
                description:
                  "This is a sample description for a task. I am typing more since there should be more lines. One more line and we're good to go. Huhh, more lines since they want this to overflow.",
                assignee: "Jai Adithya A",
                role: "Embedded & IoT Developer",
                timeLeft: "2 days left"
              }}
              color="bg-[#FCDCDC]"
            />

            <TaskCard
              task={{
                title: "Task ABCDE",
                description:
                  "This is a sample description for a task. I am typing more since there should be more lines. One more line and we're good to go. Huhh, more lines since they want this to overflow."
              }}
              color="bg-[#DFF8E8]"
            />
          </div>

          <div className="space-y-4">
            <TaskCard
              task={{
                title: "Task ABCDE",
                description:
                  "This is a sample description for a task. I am typing more since there should be more lines. One more line and we're good to go. Huhh, more lines since they want this to overflow.",
                assignee: "User 1",
                role: "Embedded & IoT Developer",
                timeLeft: "1 Month left"
              }}
              color="bg-[#EFE2CB]"
            />

            <TaskCard
              task={{
                title: "Task ABCDE",
                description:
                  "This is a sample description for a task. I am typing more since there should be more lines. One more line and we're good to go. Huhh, more lines since they want this to overflow.",
                assignee: "User 2",
                role: "Embedded & IoT Developer",
                timeLeft: "3 Month left"
              }}
              color="bg-[#DFF8E8]"
            />

            <TaskCard
              task={{
                title: "Task ABCDE",
                description:
                  "This is a sample description for a task. I am typing more since there should be more lines. One more line and we're good to go. Huhh, more lines since they want this to overflow."
              }}
              color="bg-[#EFE2CB]"
            />
          </div>
        </div>

        <div className="fixed bottom-6 right-6">
          <button className="w-12 h-12 bg-[#4D9AFF] hover:bg-[#3581d8] rounded-full flex items-center justify-center shadow-lg">
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
