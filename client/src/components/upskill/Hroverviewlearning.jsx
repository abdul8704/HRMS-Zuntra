import React from "react";

export const CourseVideoPlayer = () => {
  return (
    <div className="course-video-wrapper">
      <video
        controls
        className="course-video"
        poster="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vhv.rs%2Fviewpic%2FTRJboTw_dummy-image-image-not-available-hd-png-download%2F&psig=AOvVaw21JbmdOQmmIVq3ZYt4tPh9&ust=1750837169986000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOCs--zGiY4DFQAAAAAdAAAAABAE"
      >
        <source
          src="https://videos.pexels.com/video-files/3129424/3129424-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.

      </video>

      <style>{`
        .course-video-wrapper {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .course-video {
          width: 100%;
          height:350px; /* reduced height */
          object-fit: cover;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};
