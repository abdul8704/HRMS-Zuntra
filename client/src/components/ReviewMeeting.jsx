
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const meetings = [
  {
    title: 'Review Meeting',
    description:
      'To discuss the progress, challenges, and next steps in our app development project.',
    mode: 'On Site',
    date: '10-10-2010',
    time: '09:30-12:30',
    location: 'Ramanujam Hall',
  },
  {
    title: 'Team Review',
    description: 'Catch up with the team and address blockers for next sprint.',
    mode: 'Remote',
    date: '12-10-2010',
    time: '15:00-16:00',
    location: 'Zoom Call',
  },
];

export const ReviewMeeting = () => {
  const [index, setIndex] = useState(0);
  const current = meetings[index];

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const next = () => {
    if (index < meetings.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div className="w-full h-full overflow-hidden  bg-[#F2C3B9] rounded-xl p-4 shadow-lg">
      {/* Header with close button */}
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-bold text-black">{current.title}</h2>
        <button className="text-black text-xl font-bold hover:bg-[#fcdedd] rounded-full w-6 h-6 flex items-center justify-center">
          ×
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-800 mb-4 leading-relaxed">
        {current.description}
      </p>

      {/* Navigation arrows */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prev}
          disabled={index === 0}
          className={`text-2xl text-black ${
            index === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#fcdedd] rounded-full'
          } w-8 h-8 flex items-center justify-center`}
        >
          &#x276E;
        </button>

        <button
          onClick={next}
          disabled={index === meetings.length - 1}
          className={`text-2xl text-black ${
            index === meetings.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#fcdedd] rounded-full'
          } w-8 h-8 flex items-center justify-center`}
        >
          &#x276F;
        </button>
      </div>

      {/* Meeting details */}
      <div className="space-y-2 text-sm text-black">
        <div className="flex items-center gap-2">
          <span className="font-medium">{current.mode}</span>
          <span className="flex items-center gap-1">
            {current.date}
            <Calendar className="w-4 h-4" />
          </span>
          <span>{current.time}</span>
          <span>{current.location}</span>
        </div>
      </div>
    </div>
  );
}