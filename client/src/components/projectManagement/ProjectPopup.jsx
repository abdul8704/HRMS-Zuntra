import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export const ProjectPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teamName: '',
    teamLead: '',
    teamMembers: '',
    date: ''
  });
  const [showMemberSearch, setShowMemberSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    console.log('Project Data:', formData);
    setIsOpen(false);
    setFormData({
      title: '',
      description: '',
      teamName: '',
      teamLead: '',
      teamMembers: '',
      date: ''
    });
  };

  return (
    <>
      
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 z-50"
      >
        <Plus size={28} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center pt-6 pb-10">
          <div className="bg-white w-[65%] max-w-3xl h-auto rounded-2xl shadow-xl relative px-8 py-6">

           
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-4 p-2 rounded-full hover:bg-gray-100"
            >
              <X size={20} className="text-gray-500" />
            </button>

            <div className="space-y-5 mt-6 text-base">
              
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Project Title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-2/3 px-4 py-3 bg-[#D9D9D9] rounded-md text-base"
                />
                <div className="w-1/3">
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-4 py-3 bg-[#D9D9D9] rounded-md text-base appearance-none"
                  />
                </div>
              </div>

              <textarea
                placeholder="Project Description..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-4 py-3 bg-[#D9D9D9] rounded-md text-base resize-none"
                rows={4}
              />

              
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Team Name..."
                  value={formData.teamName}
                  onChange={(e) => handleInputChange('teamName', e.target.value)}
                  className="w-2/3 px-4 py-3 bg-[#D9D9D9] rounded-md text-base"
                />
                <select
                  value={formData.teamLead}
                  onChange={(e) => handleInputChange('teamLead', e.target.value)}
                  className="w-1/3 px-4 py-3 bg-[#D9D9D9] rounded-md text-base"
                >
                  <option value="" disabled>Team Lead</option>
                  <option value="john">John Smith</option>
                  <option value="sarah">Sarah Johnson</option>
                  <option value="mike">Mike Davis</option>
                  <option value="anna">Anna Wilson</option>
                </select>
              </div>

              
              <div className="relative">
                <textarea
                  placeholder="Team Members..."
                  value={formData.teamMembers}
                  onChange={(e) => handleInputChange('teamMembers', e.target.value)}
                  className="w-full px-4 py-3 bg-[#D9D9D9] rounded-md text-base resize-none"
                  rows={6}
                />
                <button
                  onClick={() => setShowMemberSearch(!showMemberSearch)}
                  className="absolute bottom-2 right-3 p-1"
                >
                  <Plus size={16} className="text-gray-500" />
                </button>

                {showMemberSearch && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-white shadow-md border rounded-md z-10">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 text-base border-b"
                    />
                    <div className="max-h-32 overflow-y-auto text-base">
                      {['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Emma Brown']
                        .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((name, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              const current = formData.teamMembers;
                              handleInputChange('teamMembers', current ? `${current}, ${name}` : name);
                              setShowMemberSearch(false);
                              setSearchTerm('');
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {name}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              
              <div className="text-center pt-2">
                <button
                  onClick={handleAdd}
                  className="px-6 py-2 bg-white text-gray-800 border rounded-md hover:bg-gray-100 text-base"
                  style={{ borderColor: '#BBD3CC' }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

