import React from "react";
import { Sidebar } from "../components/Sidebar";
import { CourseVideoPlayer } from "../components/upskill/Hroverviewlearning";
import { IntroductionCard } from "../components/upskill/introtocourse";
import { TableOfContents } from "../components/upskill/TableContents";

export const HrOverviewLearning = () => {
  return (
    <div className="main-layout">
      <Sidebar />

      {/* Main Content Area */}
      <div className="content-area">
        <div className="left-column">
          <div className="video-card">
            <CourseVideoPlayer />
          </div>
          <div className="intro-card">
            <IntroductionCard />
          </div>
        </div>

        <div className="right-column">
          <TableOfContents />
        </div>
      </div>

      <style>{`
        .main-layout {
          display: flex;
          height: 100vh;
        }

        .content-area {
          display: flex;
          flex: 1;
          padding: 24px;
          gap: 24px;
        }

        .left-column {
          flex: 7;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .video-card,
        .intro-card {
          width: 100%;
        }

        .right-column {
          flex: 3;
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 1024px) {
          .content-area {
            flex-direction: column;
          }

          .right-column {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};
