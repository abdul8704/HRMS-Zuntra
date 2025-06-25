import React from "react";
import { Sidebar } from "../components/Sidebar";
import { TableOfContents } from "../components/upskill/TableContents";
import { PageHeader } from "../components/upskill/PageHeader";
import { VideoAndDescriptionContainer } from "../components/upskill/VideoAndDescription";

export const HrOverviewLearning = () => {
  return (
    <div className="website-container">
      <Sidebar />

      <div className="website-module">
          <PageHeader />
          <div className="content-wrapper">
            <div className="left-side">
              <VideoAndDescriptionContainer />
            </div>
            <div className="right-side">
              <TableOfContents />
            </div>
          </div>
      </div>

      <style>{`
        .content-wrapper {
          height: 100%;
          display: flex;
          gap: 24px;
        }

        .left-side {
          flex: 7;
          display: flex;
          flex-direction: column;
          background-color: #000000;
        }

        .right-side {
          flex: 3;
          display: flex;
          height: 100%;
          background-color:rgb(0, 0, 0);
        }

        @media (max-width: 768px) {
          .content-wrapper {
            flex-direction: column;
          }

          .left-side,
          .right-side {
            width: 100%;
          }

          .right-side {
            justify-content: center;
            margin-top: 16px;
          }
        }
      `}</style>
    </div>
  );
};
