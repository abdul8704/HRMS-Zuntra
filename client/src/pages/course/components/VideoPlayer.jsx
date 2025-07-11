import React from 'react';

export const VideoPlayer = ({ videoUrl }) => {
  if (!videoUrl) return null;

  return (
    <div className="w-full flex justify-center my-4">
      <div className="w-full md:w-[80%] lg:w-[70%] aspect-video">
        <iframe
          src={videoUrl}
          title="Video"
          className="w-full h-full rounded-lg shadow-md"
          allowFullScreen
        />
      </div>
    </div>
  );
};
