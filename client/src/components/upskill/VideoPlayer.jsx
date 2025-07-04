// VideoPlayer.jsx
import React from 'react';

export const VideoPlayer = () => {
  return (
    <div>
      <div className="video-player">
        <video controls className="video-element">
          <source src="https://videos.pexels.com/video-files/3129424/3129424-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <style>{`
        .video-player {
          width: 137%;
          display: flex;
          flex-direction: column;
            align-items: left;
          justify-content: center;
          margin: 1rem 0;
        }

        .video-element {
          width: 70%;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};


