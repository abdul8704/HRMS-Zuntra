import React, { useState } from 'react';

const ReviewMeetings = [
  {
    title: "Review Meeting",
    desc: "To discuss the progress, challenges, and next steps in our app development project.",
    type: "On Site",
    date: "10-10-2010",
    startTime: "9:30",
    endTime: "12:30",
    spot: "Ramanujam Hall",
  },
  {
    title: "Sprint Planning",
    desc: "Planning the next sprint for our product backlog.",
    type: "Online",
    date: "15-10-2010",
    startTime: "14:00",
    endTime: "16:00",
    spot: "Zoom",
  },
  {
    title: "Retrospective",
    desc: "Discussing what went well and what can be improved.",
    type: "On Site",
    date: "20-10-2010",
    startTime: "10:00",
    endTime: "11:00",
    spot: "Newton Hall",
  },
];

export const ReviewMeeting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) =>
      prev === ReviewMeetings.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? ReviewMeetings.length - 1 : prev - 1
    );
  };

  const meeting = ReviewMeetings[currentIndex];

  return (
    <div className="w-full h-full p-4 flex flex-1">
      {/* Meeting Details */}
      {ReviewMeetings.length>1 && <button onClick={prev} className="text-xl px-2 flex-1 rounded-l-lg hover:opacity-90 bg-gradient-to-r from-[#F2C3B9] to-white">&lt;</button>}
      <div className="rounded-lg p-4 bg-[#F2C3B9] flex-8 flex-col">
        <div className="mb-2 flex-9">
          <h1 className="text-lg font-semibold">{meeting.title}</h1>
          <p className="text-sm text-gray-700">{meeting.desc}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm font-medium flex-1">
          <span className="px-3 py-1 rounded-lg bg-white/50">{meeting.type}</span>
          <span className="px-3 py-1 rounded-lg bg-white/50">{meeting.date}</span>
          <span className="px-3 py-1 rounded-lg bg-white/50">
            {meeting.startTime} - {meeting.endTime}
          </span>
          <span className="px-3 py-1 rounded-lg bg-white/50">{meeting.spot}</span>
        </div>
      </div>
          {/* <span className="absolute text-sm text-gray-600">
            {currentIndex + 1} / {ReviewMeetings.length}
          </span> */}
      {ReviewMeetings.length>1 && <button onClick={next} className="text-xl px-2 flex-1 rounded-r-lg hover:opacity-90 bg-gradient-to-l from-[#F2C3B9] to-white">&gt;</button>}
    </div>
  );
};