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
    <div className="relative w-full px-6 py-10">
      {/* Arrow Buttons */}
      {ReviewMeetings.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-[#eaa396] text-white px-3 py-2 rounded-full shadow-lg hover:bg-[#d88f81] transition"
          >
            &lt;
          </button>

          <button
            onClick={next}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-[#eaa396] text-white px-3 py-2 rounded-full shadow-lg hover:bg-[#d88f81] transition"
          >
            &gt;
          </button>
        </>
      )}

      {/* Main Card */}
      <div className="w-full max-w-4xl mx-auto bg-[#F2C3B9] rounded-2xl p-8 min-h-[250px] flex flex-col justify-between shadow-md">
        <div className="flex-grow">
          <h1 className="text-2xl font-bold mb-2">{meeting.title}</h1>
          <p className="text-base text-gray-700">{meeting.desc}</p>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 text-sm font-medium">
          <span className="px-4 py-1.5 rounded-lg bg-white/50">{meeting.type}</span>
          <span className="px-4 py-1.5 rounded-lg bg-white/50">{meeting.date}</span>
          <span className="px-4 py-1.5 rounded-lg bg-white/50">
            {meeting.startTime} - {meeting.endTime}
          </span>
          <span className="px-4 py-1.5 rounded-lg bg-white/50">{meeting.spot}</span>
        </div>
      </div>
    </div>
  );
};
