import React from "react";

export const VideoAndDescriptionContainer = () => {
  return (
    <div className="video-desc-wrapper">
      {/* Video */}
      <video
        controls
        className="video-element"
        poster="https://via.placeholder.com/800x450.png?text=Course+Thumbnail"
      >
        <source
          src="https://videos.pexels.com/video-files/3129424/3129424-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Description */}
      <div className="description-box">
        <h3 className="desc-title">Description</h3>
        <p className="desc-text">
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

      <style>{`
        .video-desc-wrapper {
          width: 100%;
          height: 900px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          padding: 20px;
          gap: 20px;
        }

        .video-element {
          width: 100%;
          height: 50%;
          object-fit: cover;
          border-radius: 12px;
        }

        .description-box {
          height: 50%;
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .desc-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 8px;
        }

        .desc-text {
          font-size: 14px;
          line-height: 1.6;
          color: #374151;
        }

        .video-desc-wrapper::-webkit-scrollbar {
          width: 8px;
        }

        .video-desc-wrapper::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};
