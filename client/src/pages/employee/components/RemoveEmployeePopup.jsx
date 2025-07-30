import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const RemoveEmployeePopup = () => {
  const [message, setMessage] = useState('Rejection Mail');
  const [customText, setCustomText] = useState('');
  const backdropRef = useRef();
  const navigate = useNavigate();

  const employee = { id: 1, username: 'johndoe' };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleCancel();
    };
    const handleClickOutside = (e) => {
      if (backdropRef.current && e.target === backdropRef.current) {
        handleCancel();
      }
    };
    document.addEventListener('keyup', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keyup', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCancel = () => {
    setMessage('Rejection Mail');
    setCustomText('');
    navigate(-1); // Close popup
  };

  const handleConfirm = () => {
    const finalMessage = message === 'Custom' ? customText : message;
    console.log(`Removed Employee: ${employee.id}, Message: ${finalMessage}`);
    navigate(-1);
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4"
    >
      <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-xl">
        <h3 className="text-center text-lg font-semibold text-gray-800 mb-3">
          REMOVE SIGN UP REQUEST
        </h3>
        <p className="text-center font-medium text-gray-600 mb-6">
          FROM &lt;{employee.username}&gt;
        </p>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-800">MESSAGE:</label>
          <div className="relative">
            <select
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 text-base font-medium bg-gray-100 text-gray-800 appearance-none"
            >
              <option value="Rejection Mail">Rejection Mail</option>
              <option value="No Message">No Message</option>
              <option value="Custom">Custom</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black text-lg font-bold">
              ▼
            </div>
          </div>
        </div>

        {message === 'Custom' && (
          <div className="mb-6">
            <label className="block mb-2 font-bold text-gray-800">
              CUSTOM MESSAGE:
            </label>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Write your custom message..."
              rows={3}
              className="w-full p-2.5 rounded-md border border-gray-300 text-sm resize-y"
            />
          </div>
        )}

        <div className="flex justify-center items-center gap-3">
          <button
                onClick={handleCancel}
                className="py-3 min-w-[120px] border border-gray-300 text-gray-700 rounded-full font-medium transition-colors duration-300 hover:bg-[#E1BEC5] hover:text-white hover:border-[#E1BEC5]"
              >
                Cancel
              </button>
          <button
                // onClick={handleSubmit}
                className={`py-3 min-w-[120px] rounded-full font-medium transition-colors duration-300 bg-[#BBD3CC] text-gray-700 hover:bg-[#A6C4BA] `}
              >
                REMOVE
              </button>
        </div>
      </div>
    </div>
  );
};
