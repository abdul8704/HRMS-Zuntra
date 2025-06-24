import React from "react";

export const CourseVideoPlayer = () => {
  return (
    <div className="video-wrapper">
      <video
        controls
        className="video-player"
        poster="https://via.placeholder.com/800x450.png?text=Course+Thumbnail"
      >
        <source
          src="https://videos.pexels.com/video-files/3129424/3129424-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <style>{`
        .video-wrapper {
          width: 50%;
          height: 50%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .video-player {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};
