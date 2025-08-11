import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AssignmentModule from './AssignmentModule'; // Your existing assignment component

export const AddCourseSubModule = () => {
  const initialSubModule = () => ({
    id: Date.now(),
    title: '',
    description: '',
    duration: '',
    video: null,
    videoURL: null,
    assignments: [], // used by AssignmentModule
  });

  const [subModules, setSubModules] = useState([initialSubModule()]);

  const isSubModuleComplete = (sm) =>
    sm.title.trim() && sm.description.trim() && sm.duration.trim() && sm.video;

  const canAddSubModule = () => isSubModuleComplete(subModules[subModules.length - 1]);

  const addSubModule = () => {
    if (!canAddSubModule()) return;
    setSubModules(prev => [...prev, initialSubModule()]);
  };

  const handleChange = (id, field, value) => {
    setSubModules(prev =>
      prev.map(sm => sm.id === id ? { ...sm, [field]: value } : sm)
    );
  };

  const handleVideoUpload = (id, file) => {
    const videoURL = URL.createObjectURL(file);
    setSubModules(prev =>
      prev.map(sm =>
        sm.id === id ? { ...sm, video: file, videoURL } : sm
      )
    );
  };

  const handleDrop = (id, event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      handleVideoUpload(id, file);
    }
  };

  const handleDragOver = (event) => event.preventDefault();

  // Handle assignment changes from AssignmentModule
  const handleAssignmentChange = (id, updatedAssignments) => {
    setSubModules(prev =>
      prev.map(sm => sm.id === id ? { ...sm, assignments: updatedAssignments } : sm)
    );
  };

  return (
    <div className="mt-8">
      {subModules.map((sm, index) => (
        <div key={sm.id} className="border rounded-lg p-6 mb-6 bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-4">SubModule {index + 1}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <input
              type="text"
              placeholder="Title"
              value={sm.title}
              onChange={(e) => handleChange(sm.id, 'title', e.target.value)}
              className="border p-3 rounded w-full"
            />
            <input
              type="text"
              placeholder="Duration (e.g., 1h)"
              value={sm.duration}
              onChange={(e) => handleChange(sm.id, 'duration', e.target.value)}
              className="border p-3 rounded w-full"
            />
          </div>

          <textarea
            placeholder="Description"
            value={sm.description}
            onChange={(e) => handleChange(sm.id, 'description', e.target.value)}
            className="border p-3 rounded w-full mb-6 min-h-[150px]"
          />

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div
              onDrop={(e) => handleDrop(sm.id, e)}
              onDragOver={handleDragOver}
              className="border-dashed border-2 border-gray-400 rounded-md w-full md:w-1/2 h-52 flex items-center justify-center text-gray-500 cursor-pointer"
              onClick={() => document.getElementById(`videoInput-${sm.id}`).click()}
            >
              {sm.video ? (
                <span className="text-green-600 text-sm text-center">
                  Video selected: {sm.video.name}
                </span>
              ) : (
                <span className="text-center text-gray-500">Drop or click to upload video</span>
              )}
              <input
                id={`videoInput-${sm.id}`}
                type="file"
                accept="video/*"
                onChange={(e) => handleVideoUpload(sm.id, e.target.files[0])}
                className="hidden"
              />
            </div>

            {sm.videoURL && (
              <video
                src={sm.videoURL}
                controls
                className="w-full md:w-1/2 h-52 rounded-md border object-cover"
              />
            )}
          </div>

          {/* AssignmentModule Component Here */}
          <div className="mt-6">
            <h4 className="font-semibold text-lg mb-4">Assignments</h4>
            <AssignmentModule
              initialData={sm.assignments}
              subModuleId={sm.id} // pass unique ID
              onChange={(updatedAssignments) => handleAssignmentChange(sm.id, updatedAssignments)}
            />

          </div>
        </div>
      ))}

      <button
        onClick={addSubModule}
        disabled={!canAddSubModule()}
        className={`flex items-center gap-2 font-semibold mt-4 text-base ${canAddSubModule() ? 'text-blue-600' : 'text-gray-400 cursor-not-allowed'}`}
      >
        <Plus size={18} /> Add Another SubModule
      </button>
    </div>
  );
};
