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
              <TableOfContents progress={"70%"} enrolled={true} />
            </div>
          </div>
      </div>

      <style>{`
        .content-wrapper {
  height: 75vh;
  display: flex;
  gap: 1.5rem;
}

.left-side {
  flex: 7;
  display: flex;
  flex-direction: column;
}

.right-side {
  flex: 3;
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media (max-width: 48rem) {
  .content-wrapper {
    flex-direction: column;
  }

  .left-side,
  .right-side {
    width: 100%;
  }

  .right-side {
    justify-content: center;
    margin-top: 1rem;
  }
}

      `}</style>
    </div>
  );
};
