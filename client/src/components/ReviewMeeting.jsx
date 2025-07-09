import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const meetings = [
  {
    title: 'Review Meeting',
    description: 'To discuss the progress, challenges, and next steps in our app development project.',
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

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

const ReviewMeeting = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const current = meetings[index];

  const prev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex(index - 1);
    }
  };

  const next = () => {
    if (index < meetings.length - 1) {
      setDirection(1);
      setIndex(index + 1);
    }
  };

  return (
    <div className="w-full h-full bg-[#F2C3B9] rounded-xl p-4 flex flex-col justify-between overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-[16px] font-bold text-black">{current.title}</p>
        <button className="w-6 h-6 rounded-full border border-black flex items-center justify-center text-black text-[16px] font-bold">
          +
        </button>
      </div>

      {/* Slide Description with Arrows */}
      <div className="flex items-center gap-2 mt-3 h-[60px]">
        <span
          className={`text-black text-xl cursor-pointer ${index === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
          onClick={prev}
        >
          &#x276E;
        </span>

        <div className="relative flex-1 overflow-hidden h-full">
          <AnimatePresence custom={direction} mode="wait">
            <motion.p
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute w-full top-0 left-0 text-sm text-gray-800"
            >
              {current.description}
            </motion.p>
          </AnimatePresence>
        </div>

        <span
          className={`text-black text-xl cursor-pointer ${index === meetings.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
          onClick={next}
        >
          &#x276F;
        </span>
      </div>

      {/* Bottom Tag Row */}
      <div className="flex gap-2 mt-4 whitespace-nowrap">
        <span className="bg-[#F4CFC4] px-3 py-1 rounded-md text-sm text-black">{current.mode}</span>
        <span className="bg-[#F4CFC4] px-3 py-1 rounded-md text-sm text-black flex items-center gap-1">
          {current.date}
          <Calendar className="w-4 h-4" />
        </span>
        <span className="bg-[#F4CFC4] px-3 py-1 rounded-md text-sm text-black">{current.time}</span>
        <span className="bg-[#F4CFC4] px-3 py-1 rounded-md text-sm text-black">{current.location}</span>
      </div>
    </div>
  );
};

export default ReviewMeeting;
