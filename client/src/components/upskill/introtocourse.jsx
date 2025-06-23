import React from "react";

export const IntroductionCard = () => {
  return (
    <div className="intro-card">
      {/* Title and Instructor */}
      <h2 className="title">Introduction to course</h2>
      <p className="instructor">by Prof. Dr. Diwakar</p>

      {/* Description */}
      <div className="description-box">
        <h3 className="desc-title">Description</h3>
        <p className="desc-text">
          This course provides a comprehensive introduction to key concepts,
          tools, and techniques in theoretical knowledge with practical
          applications to help learners gain real-world skills. Designed for
          beginners and learners, the course encourages interactive learning
          through assignments, projects, and assessments. I have no more content
          to type in this description. I was searching some words.
          <br />
          <br />
          By the end of the course, participants will be equipped to tackle
          real-world problems with confidence. Covering essential concepts,
          tools, and techniques, the course integrates interactive lectures,
          hands-on projects, and real-world case studies to ensure deep
          understanding and application. Learners will engage in structured
          modules that promote critical thinking, problem-solving, and technical
          proficiency.
        </p>
      </div>

      <style>{`
        .intro-card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 20px;
          max-width: 800px;
          margin: auto;
        }

        .title {
          font-size: 22px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
        }

        .instructor {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 16px;
        }

        .description-box {
          background: #f9fafb;
          border-radius: 8px;
          padding: 16px;
          max-height: 220px;
          overflow-y: auto;
        }

        .desc-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #111827;
        }

        .desc-text {
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
        }

        /* Optional scrollbar styling */
        .description-box::-webkit-scrollbar {
          width: 6px;
        }
        .description-box::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};
