import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const styles = {
  floatingButton: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '56px',
    height: '56px',
    backgroundColor: '#16a34a',
    color: 'white',
    borderRadius: '50%',
    border: 'none',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 50,
    transition: 'background-color 0.2s ease'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px 24px 40px 24px'
  },
  modal: {
    backgroundColor: 'white',
    width: '65%',
    maxWidth: '768px',
    height: 'auto',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    position: 'relative',
    padding: '24px 32px',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  closeButton: {
    position: 'absolute',
    top: '8px',
    right: '16px',
    padding: '8px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  formContainer: {
    marginTop: '24px',
    fontSize: '16px'
  },
  row: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    alignItems: 'stretch'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  input: {
    padding: '12px 16px',
    backgroundColor: '#D9D9D9',
    borderRadius: '6px',
    border: 'none',
    fontSize: '16px',
    outline: 'none',
    transition: 'background-color 0.2s ease'
  },
  inputTwoThirds: {
    flex: '2'
  },
  inputOneThird: {
    flex: '1'
  },
  inputFull: {
    width: '100%'
  },
  textarea: {
    padding: '12px 16px',
    backgroundColor: '#D9D9D9',
    borderRadius: '6px',
    border: 'none',
    fontSize: '16px',
    resize: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'background-color 0.2s ease'
  },
  select: {
    padding: '12px 16px',
    backgroundColor: '#D9D9D9',
    borderRadius: '6px',
    border: 'none',
    fontSize: '16px',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '16px',
    paddingRight: '40px'
  },
  textareaContainer: {
    position: 'relative',
    marginBottom: '20px'
  },
  addMemberButton: {
    position: 'absolute',
    bottom: '8px',
    right: '12px',
    padding: '4px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    marginTop: '8px',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    zIndex: 10,
    overflow: 'hidden'
  },
  searchInput: {
    width: '100%',
    padding: '8px 16px',
    fontSize: '16px',
    border: 'none',
    borderBottom: '1px solid #e5e7eb',
    outline: 'none'
  },
  memberList: {
    maxHeight: '128px',
    overflowY: 'auto'
  },
  memberItem: {
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    fontSize: '16px'
  },
  buttonContainer: {
    textAlign: 'center',
    paddingTop: '8px'
  },
  addButton: {
    padding: '8px 24px',
    backgroundColor: 'white',
    color: '#374151',
    border: '1px solid #BBD3CC',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  }
};

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
        style={styles.floatingButton}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
      >
        <Plus size={28} />
      </button>

      {isOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button
              onClick={() => setIsOpen(false)}
              style={styles.closeButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <X size={20} style={{ color: '#6b7280' }} />
            </button>

            <div style={styles.formContainer}>
              <div style={styles.inputGroup}>
                {/* Title and Date Row */}
                <div style={styles.row}>
                  <input
                    type="text"
                    placeholder="Project Title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    style={{...styles.input, ...styles.inputTwoThirds}}
                  />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    style={{...styles.input, ...styles.inputOneThird}}
                  />
                </div>

                {/* Description */}
                <textarea
                  placeholder="Project Description..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  style={{...styles.textarea, ...styles.inputFull}}
                  rows={4}
                />

                {/* Team Name and Team Lead Row */}
                <div style={styles.row}>
                  <input
                    type="text"
                    placeholder="Team Name..."
                    value={formData.teamName}
                    onChange={(e) => handleInputChange('teamName', e.target.value)}
                    style={{...styles.input, ...styles.inputTwoThirds}}
                  />
                  <select
                    value={formData.teamLead}
                    onChange={(e) => handleInputChange('teamLead', e.target.value)}
                    style={{...styles.select, ...styles.inputOneThird}}
                  >
                    <option value="" disabled>Team Lead</option>
                    <option value="john">John Smith</option>
                    <option value="sarah">Sarah Johnson</option>
                    <option value="mike">Mike Davis</option>
                    <option value="anna">Anna Wilson</option>
                  </select>
                </div>

                {/* Team Members */}
                <div style={styles.textareaContainer}>
                  <textarea
                    placeholder="Team Members..."
                    value={formData.teamMembers}
                    onChange={(e) => handleInputChange('teamMembers', e.target.value)}
                    style={{...styles.textarea, ...styles.inputFull}}
                    rows={6}
                  />
                  <button
                    onClick={() => setShowMemberSearch(!showMemberSearch)}
                    style={styles.addMemberButton}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <Plus size={16} style={{ color: '#6b7280' }} />
                  </button>

                  {showMemberSearch && (
                    <div style={styles.dropdown}>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                      />
                      <div style={styles.memberList}>
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
                              style={styles.memberItem}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                            >
                              {name}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Add Button */}
                <div style={styles.buttonContainer}>
                  <button
                    onClick={handleAdd}
                    style={styles.addButton}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};