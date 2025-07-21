// AddCourseIntro.jsx
import React, { useState, useRef } from 'react';

export const AddCourseIntro = ({
  courseData = {},
  errors = {},
  dragActive = false,
  handleInputChange = () => {},
  handleFileInputChange = () => {},
  handleDrag = () => {},
  handleDrop = () => {},
  removeVideo = () => {},
  formatFileSize = (size) => `${(size / (1024 * 1024)).toFixed(2)} MB`,
  onNext = () => {},
  isFormComplete = false,
  disabled = false,
  isStepCompleted = false
}) => {
  const [localDragActive, setLocalDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setLocalDragActive(true);
      handleDrag(e);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setLocalDragActive(false);
      handleDrag(e);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      e.dataTransfer.dropEffect = 'copy';
      handleDrag(e);
    }
  };

  const handleDropEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalDragActive(false);
    if (!disabled) {
      const files = Array.from(e.dataTransfer.files);
      const videoFile = files.find(file => file.type.startsWith('video/'));
      if (videoFile) {
        const maxSize = 500 * 1024 * 1024;
        if (videoFile.size > maxSize) return alert('File size must be less than 500MB');
        const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/quicktime'];
        if (!allowedTypes.includes(videoFile.type)) return alert('Invalid video format');
        handleDrop(e);
      } else {
        alert('Please drop a video file');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 500 * 1024 * 1024;
      if (file.size > maxSize) return alert('File size must be less than 500MB');
      const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/quicktime'];
      if (!allowedTypes.includes(file.type)) return alert('Invalid video format');
      handleFileInputChange(e);
    }
  };

  const handleRemoveVideo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeVideo();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUploadClick = () => {
    if (!disabled && fileInputRef.current) fileInputRef.current.click();
  };

  const isCurrentlyDragActive = dragActive || localDragActive;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Course Introduction</h2>
        <p className="text-gray-600 mt-2">Fill in the basic information about your course</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold text-gray-700">
            Course Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={courseData.courseName || ''}
            onChange={(e) => handleInputChange('courseName', e.target.value)}
            disabled={disabled}
            className={`w-full px-4 py-3 border rounded-lg ${errors.courseName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.courseName && <p className="text-red-500 text-sm">Course name is required</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Instructor Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={courseData.instructorName || ''}
            onChange={(e) => handleInputChange('instructorName', e.target.value)}
            disabled={disabled}
            className={`w-full px-4 py-3 border rounded-lg ${errors.instructorName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.instructorName && <p className="text-red-500 text-sm">Instructor name is required</p>}
        </div>
      </div>

      <div>
        <label className="block font-semibold text-gray-700">
          Course Description <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          value={courseData.courseDescription || ''}
          onChange={(e) => handleInputChange('courseDescription', e.target.value)}
          disabled={disabled}
          className={`w-full px-4 py-3 border rounded-lg resize-vertical ${errors.courseDescription ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.courseDescription && <p className="text-red-500 text-sm">Description is required</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          onClick={handleUploadClick}
          onDrop={handleDropEvent}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          className={`relative border-2 border-dashed rounded-lg p-6 flex justify-center items-center h-48 transition-all ${
            isCurrentlyDragActive
              ? 'border-[#A6C4BA] bg-[#BBD3CC]/20 scale-105'
              : courseData.introVideo
              ? 'border-green-400 bg-green-50'
              : errors.introVideo
              ? 'border-red-500'
              : 'border-gray-300'
          } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            disabled={disabled}
          />
          {!courseData.introVideo ? (
            <p className="text-center text-gray-500">Drop or click to upload video</p>
          ) : (
            <div className="text-center text-green-700 space-y-1">
              <p className="font-semibold">{courseData.introVideo.name}</p>
              <p className="text-sm">{formatFileSize(courseData.introVideo.size)}</p>
            </div>
          )}
          {courseData.introVideo && !disabled && (
            <button
              onClick={handleRemoveVideo}
              className="absolute top-3 right-3 text-red-600 bg-white rounded-full p-1 shadow"
            >
              ✕
            </button>
          )}
        </div>

        <div className="border border-gray-300 rounded-lg bg-gray-50 h-48 flex items-center justify-center overflow-hidden">
          {courseData.introVideo ? (
            <video
              src={URL.createObjectURL(courseData.introVideo)}
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <p className="text-gray-400">No video selected</p>
          )}
        </div>
      </div>

      {errors.introVideo && <p className="text-red-500 text-sm">Introduction video is required</p>}

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={!isFormComplete}
          className={`px-6 py-3 rounded-lg font-semibold ${
            isFormComplete ? 'bg-[#A6C4BA] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isStepCompleted ? 'Continue to Modules' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};
