import React, { useState } from "react";

const LoomVideoForm = () => {
  const [videoTitle, setVideoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loomUrl, setLoomUrl] = useState("");

  const handleAddVideo = () => {
    if (!videoTitle || !loomUrl) {
      alert("Please enter required fields.");
      return;
    }
    console.log("Video added:", { videoTitle, description, loomUrl });
    setVideoTitle("");
    setDescription("");
    setLoomUrl("");
  };

  return (
    <div className="flex justify-center items-center mt-8 w-full">
      <div className="bg-[#D6D6D6] rounded-2xl w-[400px] p-4 shadow-md">
        {/* Admin Panel Heading */}
        <div className="text-center">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-700">Record and Manage video content</p>
        </div>

        {/* Record with Loom Section */}
        <div className="bg-white mt-4 rounded-xl p-4 shadow-inner">
          <h2 className="text-center font-bold mb-5">Record with Loom</h2>
          <div className="flex justify-center gap-3 mb-4">
            <a
              href="https://www.loom.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-5 py-3 rounded-full"
            >
              Go to Loom Website
            </a>
            <a
              href="https://chromewebstore.google.com/detail/loom"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-5 py-3 rounded-full"
            >
              Install loom Extension
            </a>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white mt-10 rounded-xl p-4 shadow-inner">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Video Title *</label>
              <input
                type="text"
                placeholder="Enter video Title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <input
                type="text"
                placeholder="Brief description of the video content"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Loom Video URL *</label>
              <input
                type="url"
                placeholder="https://loom.com/share/..."
                value={loomUrl}
                onChange={(e) => setLoomUrl(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Add Button */}
          <div className="text-center mt-4">
            <button
              onClick={handleAddVideo}
              className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-2 rounded-full text-sm font-semibold"
            >
              Add Video
            </button>
          </div>

          {/* Manage Videos */}
          <div className="text-center mt-4 text-gray-600 text-sm">
            <p className="font-medium">Manage videos</p>
            <p className="text-xs text-gray-500">No videos added yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoomVideoForm;



