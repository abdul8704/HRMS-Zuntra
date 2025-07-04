import React from 'react';

export const AssignmentsSection = () => {
  return (
    <div className="assignment-section">
      <h4 className="assignment-title">
        <span className="assignment-bar"></span>
        Assignments
      </h4>

      <div className="question-box">
        <p>1. Answer for question 1 is option b. Okay?</p>
        <form>
          <label><input type="radio" name="q1" /> option 1</label><br />
          <label><input type="radio" name="q1" /> option 2</label><br />
          <label><input type="radio" name="q1" defaultChecked /> option 3</label><br />
          <label><input type="radio" name="q1" /> option 4</label>
        </form>
      </div>

      <div className="question-box">
        <p>2. Answer for question 2 is option b. Okay?</p>
        <form>
          <label><input type="radio" name="q2" defaultChecked /> option 1</label><br />
          <label><input type="radio" name="q2" /> option 2</label><br />
          <label><input type="radio" name="q2" /> option 3</label><br />
          <label><input type="radio" name="q2" /> option 4</label>
        </form>
      </div>

      <button className="submit-btn">Submit</button>

      <style>{`
        .assignment-section {
          padding: 1rem;
        }

        .assignment-title {
          display: flex;
          align-items: center;
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .assignment-bar {
          width: 4px;
          height: 20px;
          background-color: #009688;
          margin-right: 10px;
        }

        .question-box {
          background-color: #e0e0e0;
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 8px;
        }

        .question-box p {
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        label {
          display: block;
          margin: 0.3rem 0;
          font-size: 0.95rem;
        }

        .submit-btn {
          margin-top: 1rem;
          padding: 0.4rem 1.5rem;
          border: 1px solid #009688;
          border-radius: 20px;
          background-color: white;
          color: #009688;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s;
        }

        .submit-btn:hover {
          background-color: #009688;
          color: white;
        }
      `}</style>
    </div>
  );
};


