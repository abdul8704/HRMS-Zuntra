import React from "react";

export const VideoAndDescriptionContainer = () => {
  return (
    <div className="w-full h-[56.25rem] bg-white rounded-xl shadow-md overflow-y-auto flex flex-col p-5 gap-5 scrollbar-thin scrollbar-thumb-slate-300">
      {/* Video */}
      <video
        controls
        className="w-full h-[90%] object-cover rounded-xl"
        poster="https://via.placeholder.com/800x450.png?text=Course+Thumbnail"
      >
        <source
          src="https://videos.pexels.com/video-files/3129424/3129424-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Description */}
      <div className="h-1/2 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          This course provides a comprehensive introduction to key concepts,
          tools, and techniques in theoretical knowledge with practical
          applications to help learners gain real-world skills.
          <br /><br />
          By the end of the course, participants will be equipped to tackle
          real-world problems with confidence. Covering essential concepts,
          tools, and techniques, the course integrates interactive lectures,
          hands-on projects, and real-world case studies to ensure deep
          understanding and application.
          <br /><br />
          Topics include software engineering, database systems, web development,
          machine learning basics, UI/UX, deployment strategies, and cloud
          fundamentals.
          <br /><br />
          Assignments and real-world scenarios will challenge learners to apply
          theoretical knowledge to practical problems. The course ends with a
          capstone project.
          <br /><br />
          Resources include downloadable materials, interactive quizzes,
          peer-reviewed assignments, and 1:1 mentorship support.
          <br /><br />
          No prior experience is needed, but commitment to learning and growth
          is encouraged. Ideal for students, professionals, and curious minds.
          <br /><br />
          Join now to begin your journey into modern tech!
        </p>
      </div>
    </div>
  );
};
