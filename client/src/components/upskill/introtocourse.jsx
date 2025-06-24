import React from "react";

export const IntroductionCard = () => {
  return (
    <div className="intro-wrapper">
      {/*<h2 className="title">Introduction to course</h2>
      <p className="instructor">by Prof. Dr. Diwakar</p>*/}

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
          understanding and application. Learners will engage in structured
          modules that promote critical thinking, problem-solving, and technical
          proficiency.
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
        .intro-wrapper {
          width: 100%;
          height: 320px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 2px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
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
          flex: 1;
          background: #f9fafb;
          border-radius: 8px;
          padding: 16px;
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
