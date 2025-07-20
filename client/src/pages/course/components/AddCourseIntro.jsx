import React from 'react';

export const AddCourseIntro = ({
  courseData,
  errors,
  dragActive,
  handleInputChange,
  handleFileInputChange,
  handleDrag,
  handleDrop,
  removeVideo,
  formatFileSize,
  onNext,
  isFormComplete,
  disabled
}) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Course Introduction</h2>
        <p className="text-gray-600 mt-2">Fill in the basic information about your course</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={courseData.courseName}
              onChange={(e) => handleInputChange('courseName', e.target.value)}
              placeholder="Enter course name"
              disabled={disabled}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.courseName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-[#A6C4BA]'
              }`}
            />
            {errors.courseName && <p className="text-red-500 text-sm">Course name is required</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Instructor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={courseData.instructorName}
              onChange={(e) => handleInputChange('instructorName', e.target.value)}
              placeholder="Enter instructor name"
              disabled={disabled}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.instructorName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-[#A6C4BA]'
              }`}
            />
            {errors.instructorName && <p className="text-red-500 text-sm">Instructor name is required</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Course Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={courseData.courseDescription}
            onChange={(e) => handleInputChange('courseDescription', e.target.value)}
            placeholder="Provide a detailed description of your course..."
            rows={4}
            disabled={disabled}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-vertical ${
              errors.courseDescription
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-[#A6C4BA]'
            }`}
          />
          {errors.courseDescription && (
            <p className="text-red-500 text-sm">Course description is required</p>
          )}
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">
            Introduction Video <span className="text-red-500">*</span>
          </label>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer h-48 flex flex-col justify-center ${
                dragActive
                  ? 'border-[#A6C4BA] bg-[#BBD3CC]/20'
                  : courseData.introVideo
                  ? 'border-green-400 bg-green-50'
                  : errors.introVideo
                  ? 'border-red-500 hover:border-red-400'
                  : 'border-gray-300 hover:border-[#A6C4BA]'
              }`}
              onDrop={disabled ? null : handleDrop}
              onDragOver={disabled ? null : handleDrag}
              onDragEnter={disabled ? null : handleDrag}
              onDragLeave={disabled ? null : handleDrag}
              onClick={() => !disabled && document.getElementById('video-upload').click()}
            >
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                disabled={disabled}
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {!courseData.introVideo ? (
                <div className="space-y-3 pointer-events-none">
                  <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-700">Drop your video file here or click to browse</p>
                  <p className="text-xs text-gray-500">MP4, AVI, MOV, WMV — up to 500MB</p>
                </div>
              ) : (
                <div className="pointer-events-none space-y-3">
                  <svg className="w-12 h-12 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-green-700 break-words">{courseData.introVideo.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatFileSize(courseData.introVideo.size)}</p>
                  </div>
                </div>
              )}

              {courseData.introVideo && !disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeVideo();
                  }}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow-sm"
                  title="Remove video"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Video Preview */}
            <div className="border border-gray-300 rounded-lg bg-gray-50 h-48 flex items-center justify-center">
              {courseData.introVideo ? (
                <video
                  src={URL.createObjectURL(courseData.introVideo)}
                  controls
                  className="w-full h-full rounded-lg object-contain"
                />
              ) : (
                <div className="text-center text-gray-500 space-y-2">
                  <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-medium">Video Preview</p>
                  <p className="text-xs">No video selected</p>
                </div>
              )}
            </div>
          </div>

          {errors.introVideo && (
            <p className="text-red-500 text-sm">Introduction video is required</p>
          )}
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            onClick={onNext}
            disabled={!isFormComplete || disabled}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
              isFormComplete && !disabled
                ? 'bg-[#A6C4BA] hover:bg-[#8fb5a7] text-white shadow-md hover:shadow-lg transform hover:scale-[1.02]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next Step
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};