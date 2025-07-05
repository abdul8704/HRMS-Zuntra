import React from 'react';

export const VideoPlayer = () => {
  return (
    <div className="w-[137%] flex flex-col items-start justify-center my-4">
      <video
        controls
        className="w-[70%] rounded-lg shadow-md"
      >
        <source
          src="https://videos.pexels.com/video-files/3129424/3129424-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
