import React from "react";

export const SubModulePage = () => {
  return (
    <div className="submodule-container">
      <div className="submodule-title">
        <div className="title-left">
          <span className="title-bar" />
          <h2>Sub Module 2 Name</h2>
        </div>
        <div className="submodule-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 41 38" fill="#000">
            <path fillOpacity=".5" d="M25.65 37.8a1.35 1.35 0 1 0 0-2.7H8.1a5.4 5.4 0 0 1-5.4-5.4V8.1a5.4 5.4 0 0 1 5.4-5.4h17.55a1.35 1.35 0 0 0 0-2.7H8.1A8.1 8.1 0 0 0 0 8.1v21.6a8.1 8.1 0 0 0 8.1 8.1h17.55Zm3.094-29.306a1.35 1.35 0 0 1 1.912 0l9.45 9.45a1.35 1.35 0 0 1 0 1.912l-9.45 9.45a1.351 1.351 0 1 1-1.912-1.912l7.147-7.144H12.15a1.35 1.35 0 1 1 0-2.7h23.741l-7.147-7.144a1.35 1.35 0 0 1 0-1.912Z"/>
          </svg>
        </div>
      </div>

      {/* Video */}
      <div className="video-section">
        <video controls width="100%">
          <source src="your-video-url.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Description */}
      <div className="description-section">
        <h3>
          <span className="section-bar" /> Description
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
      </div>

      {/* Assignments */}
      <div className="assignments-section">
        <h3>
          <span className="section-bar" /> Assignments
        </h3>

        {[1, 2].map((q, index) => (
          <div key={index} className="question-box">
            <p>{q}. Answer for question {q} is option b. Okay?</p>
            {["option 1", "option 2", "option 3", "option 4"].map((opt, idx) => (
              <label key={idx} className="option-label">
                <input type="radio" name={`question-${q}`} value={opt} />
                {opt}
              </label>
            ))}
          </div>
        ))}

        <button className="submit-button">Submit</button>
      </div>

      <style>{`
        .submodule-container {
          width: 100%;
          max-width: 800px;
          margin: 25px auto;
          padding: 1rem;
          font-family: 'Segoe UI', sans-serif;
          color: #333;
        }

        .submodule-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .title-left {
          display: flex;
          align-items: center;
        }

        .title-left h2 {
          font-size: 1.3rem;
          margin: 0;
        }

        .title-bar {
          width: 4px;
          height: 20px;
          background-color: #2b9c9f;
          margin-right: 0.5rem;
          border-radius: 2px;
        }

        .submodule-icon svg {
          opacity: 0.5;
        }

        .video-section {
          margin-bottom: 1.5rem;
          border-radius: 6px;
          overflow: hidden;
          background-color: #f0f0f0;
        }

        .description-section,
        .assignments-section {
          margin-bottom: 2rem;
        }

        h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
        }

        .section-bar {
          width: 4px;
          height: 16px;
          background-color: #2b9c9f;
          margin-right: 0.5rem;
          border-radius: 2px;
        }

        .question-box {
          background-color: #f6f6f6;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .option-label {
          display: block;
          margin: 0.25rem 0;
          font-size: 0.95rem;
        }

        .submit-button {
          margin-top: 1rem;
          background-color: white;
          border: 1px solid #999;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-weight: 500;
        }

        .submit-button:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
};
