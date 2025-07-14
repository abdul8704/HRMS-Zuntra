import React, { useState } from 'react';
import { X, Users, Calendar, Play } from 'lucide-react';
import { MdVideoCall } from 'react-icons/md';


export const NotificationPopup = ({ setShowPopup }) => {
  const [userRole, setUserRole] = useState('HR'); // 'HR' or 'Team Lead'
  const [notification, setNotification] = useState('');
  const [recipientType, setRecipientType] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [showMeetDropdown, setShowMeetDropdown] = useState(false);

  const teams = [
    { id: 1, name: 'Development Team' },
    { id: 2, name: 'Marketing Team' },
    { id: 3, name: 'Sales Team' },
    { id: 4, name: 'HR Team' }
  ];

  const employees = [
    { id: 1, name: 'John Doe', team: 'Development' },
    { id: 2, name: 'Jane Smith', team: 'Marketing' },
    { id: 3, name: 'Mike Johnson', team: 'Sales' },
    { id: 4, name: 'Sarah Wilson', team: 'HR' },
    { id: 5, name: 'Alex Brown', team: 'Development' },
    { id: 6, name: 'Emma Davis', team: 'Marketing' }
  ];

  const getRecipientOptions = () => {
    if (userRole === 'HR') {
      return [
        { value: 'team', label: 'Team' },
        { value: 'all', label: 'All' }
      ];
    } else {
      return [
        { value: 'all', label: 'All' },
        { value: 'colleagues', label: 'Colleagues' }
      ];
    }
  };

  const getSecondDropdownOptions = () => {
    if (recipientType === 'team') {
      return teams.map(team => ({ value: team.id, label: team.name }));
    } else if (recipientType === 'colleagues') {
      return employees.map(emp => ({ value: emp.id, label: emp.name }));
    }
    return [];
  };

  const handleRecipientTypeChange = (e) => {
    setRecipientType(e.target.value);
    setSelectedRecipients([]);
  };

  const handleRecipientSelection = (e) => {
    const value = e.target.value;
    if (value && !selectedRecipients.includes(value)) {
      setSelectedRecipients([...selectedRecipients, value]);
    }
  };

  const removeRecipient = (recipientToRemove) => {
    setSelectedRecipients(selectedRecipients.filter(r => r !== recipientToRemove));
  };

  const getRecipientName = (recipientId) => {
    if (recipientType === 'team') {
      const team = teams.find(t => t.id === parseInt(recipientId));
      return team ? team.name : recipientId;
    } else if (recipientType === 'colleagues') {
      const employee = employees.find(e => e.id === parseInt(recipientId));
      return employee ? employee.name : recipientId;
    }
    return recipientId;
  };

  const handleSend = () => {
    if (!notification.trim()) {
      alert('Please enter a notification message');
      return;
    }
    if (!recipientType) {
      alert('Please select recipient type');
      return;
    }
    if (recipientType !== 'all' && selectedRecipients.length === 0) {
      alert('Please select recipients');
      return;
    }

    console.log('Sending notification:', {
      message: notification,
      recipientType,
      recipients: selectedRecipients,
      userRole
    });

    alert('Notification sent successfully!');
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const generateMeetingLink = () => {
    const meetingId = Math.random().toString(36).substr(2, 10);
    return `https://meet.google.com/${meetingId}`;
  };

  const handleScheduleMeeting = () => {
    const meetingLink = generateMeetingLink();
    const meetingText = `\n\nScheduled Meeting: ${meetingLink}`;
    setNotification(prev => prev + meetingText);
    setShowMeetDropdown(false);
  };

  const handleInstantMeeting = () => {
    const meetingLink = generateMeetingLink();
    const meetingText = `\n\nInstant Meeting: ${meetingLink}`;
    setNotification(prev => prev + meetingText);
    setShowMeetDropdown(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96 max-w-full mx-4">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Notification</h2>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Notification textarea */}
          <div className="relative">
            <textarea
              value={notification}
              onChange={(e) => setNotification(e.target.value)}
              placeholder="Enter your notification message..."
              className="w-full h-24 p-3 pr-12 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            {/* Google Meet Button */}
            <div className="absolute bottom-2 right-2">
              <button
                onClick={() => setShowMeetDropdown(!showMeetDropdown)}
                className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 shadow-sm"
                title="Add Google Meet"
              >
                <MdVideoCall className="w-6 h-6 text-green-600" />
              </button>

              {showMeetDropdown && (
                <div className="absolute bottom-10 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-48">
                  <button
                    onClick={handleScheduleMeeting}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Calendar size={14} />
                    Schedule Meeting
                  </button>
                  <button
                    onClick={handleInstantMeeting}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Play size={14} />
                    Start Instant Meeting
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recipient selection */}
          <div className="space-y-3">
            <div className="flex space-x-3">
              {/* Recipient type */}
              <div className="flex-1">
                <select
                  value={recipientType}
                  onChange={handleRecipientTypeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select recipient type</option>
                  {getRecipientOptions().map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recipients */}
              <div className="flex-1">
                <select
                  value=""
                  onChange={handleRecipientSelection}
                  disabled={!recipientType || recipientType === 'all'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {recipientType === 'all'
                      ? 'All selected'
                      : recipientType
                      ? `Select ${recipientType}...`
                      : 'Select type first'}
                  </option>
                  {getSecondDropdownOptions().map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected recipients display */}
            {selectedRecipients.length > 0 && (
              <div className="mt-3">
                <div className="text-sm text-gray-600 mb-2">Selected recipients:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipients.map(recipient => (
                    <span
                      key={recipient}
                      className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      <Users size={14} />
                      {getRecipientName(recipient)}
                      <button
                        onClick={() => removeRecipient(recipient)}
                        className="text-blue-600 hover:text-blue-800 ml-1"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center space-x-3 p-4 border-t bg-gray-50">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
