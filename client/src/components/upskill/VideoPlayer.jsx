import React from 'react';

export const VideoPlayer = ({ videoUrl }) => {
  if (!videoUrl) return null;

  return (
    <div className="w-[137%] flex flex-col items-start justify-center my-4">
      <iframe
        src={videoUrl}
        title="Video"
        className="w-[70%] aspect-video rounded-lg shadow-md"
        allowFullScreen
      />
    </div>
  );
};

