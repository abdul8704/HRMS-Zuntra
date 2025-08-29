import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  Monitor,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const ReviewMeetings = [
  {
    title: 'Review Meeting',
    desc: 'To discuss the progress, challenges, and next steps in our app development project.',
    type: 'On Site',
    date: '10-10-2010',
    startTime: '9:30',
    endTime: '12:30',
    spot: 'Ramanujam Hall',
  },
  {
    title: 'Sprint Planning',
    desc: 'Planning the next sprint for our product backlog.',
    type: 'Online',
    date: '15-10-2010',
    startTime: '14:00',
    endTime: '16:00',
    spot: 'Zoom',
  },
];

export const ReviewMeeting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const meeting = ReviewMeetings[currentIndex];

  const next = () =>
    setCurrentIndex((prev) =>
      prev === ReviewMeetings.length - 1 ? 0 : prev + 1
    );

  const prev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? ReviewMeetings.length - 1 : prev - 1
    );

  return (
    <div className="bg-[#f2c3b9] rounded-2xl px-6 py-6 shadow-md w-full h-full flex flex-col">
      <h3 className="text-xl sm:text-2xl font-bold text-[#222] mb-1">
        {meeting.title}
      </h3>
      <p className="text-sm sm:text-base text-gray-800 mb-4 flex-grow">
        {meeting.desc}
      </p>

      <div className="flex flex-wrap gap-3 items-center justify-start relative">
        {/* Chevron Left */}
        {ReviewMeetings.length > 1 && (
          <button
            onClick={prev}
            className="absolute left-[-25px] top-1/2 -translate-y-1/2 text-black hover:text-gray-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Pill Boxes */}
        <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg text-sm">
          {meeting.type === 'Online' ? (
            <Monitor className="w-4 h-4" />
          ) : (
            <MapPin className="w-4 h-4" />
          )}
          {meeting.type}
        </span>
        <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg text-sm">
          <CalendarDays className="w-4 h-4" />
          {meeting.date}
        </span>
        <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg text-sm">
          <Clock className="w-4 h-4" />
          {meeting.startTime} – {meeting.endTime}
        </span>
        <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg text-sm">
          <MapPin className="w-4 h-4" />
          {meeting.spot}
        </span>

        {/* Chevron Right */}
        {ReviewMeetings.length > 1 && (
          <button
            onClick={next}
            className="absolute right-[-25px] top-1/2 -translate-y-1/2 text-black hover:text-gray-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
