import React, { useState } from 'react';
import { EmpProfile } from '../../employee/components/EmpProfile';

const styles = {
  floatingButton: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '46px',
    height: '46px',
    backgroundColor: '#BBD3CC',
    color: 'white',
    borderRadius: '50%',
    border: 'none',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 50
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
    padding: '24px'
  },
  modal: {
    backgroundColor: 'white',
    width: '65%',
    maxWidth: '768px',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '24px 32px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative'
  },
  formContainer: {
    marginTop: '16px',
    fontSize: '16px'
  },
  row: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
    alignItems: 'stretch'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    padding: '12px 16px',
    backgroundColor: '#D9D9D9',
    borderRadius: '6px',
    border: 'none',
    fontSize: '16px',
    outline: 'none'
  },
  inputTwoThirds: { flex: '2' },
  inputOneThird: { flex: '1' },
  inputFull: { width: '100%' },
  textarea: {
    padding: '12px 16px',
    backgroundColor: '#D9D9D9',
    borderRadius: '6px',
    border: 'none',
    fontSize: '16px',
    resize: 'none',
    outline: 'none',
    fontFamily: 'inherit'
  },
  textareaContainer: {
    position: 'relative',
    marginBottom: '12px',
    height: '150px'
  },
  addMemberButton: {
    position: 'absolute',
    bottom: '8px',
    right: '12px',
    padding: '4px',
    border: 'none',
    backgroundColor: '#BBD3CC',
    cursor: 'pointer',
    borderRadius: '50%'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    marginTop: '8px',
    left: 0,
    right: 0,
    backgroundColor: '#BBD3CC',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    zIndex: 10
  },
  searchInput: {
  width: '100%',
  padding: '8px 16px',
  fontSize: '16px',
  border: '1px solid #e5e7eb',
  borderRadius: '6px',
  backgroundColor: '#BBD3CC',
  color: '#000',
  outline: 'none',
  marginBottom: '8px'
},

  addButton: {
    padding: '8px 24px',
    backgroundColor: 'white',
    color: '#374151',
    border: '1px solid #BBD3CC',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  buttonContainer: {
    textAlign: 'center',
    paddingTop: '8px'
  }
};

export const ProjectPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teamName: '',
    teamLead: null,
    teamMembers: [],
    date: ''
  });

  const employeeList = [
    { name: 'Johny Doe', role: 'Frontend Developer', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { name: 'Sarah Johnson', role: 'Backend Developer', avatar: 'https://randomuser.me/api/portraits/men/62.jpg' },
    { name: 'Mike Davis', role: 'UI/UX Designer', avatar: 'https://randomuser.me/api/portraits/women/75.jpg' },
    { name: 'Emma Watson', role: 'QA Engineer', avatar: 'https://randomuser.me/api/portraits/men/48.jpg' },
    { name: 'Liam Brown', role: 'DevOps Engineer', avatar: 'https://randomuser.me/api/portraits/women/21.jpg' },
    { name: 'Olivia Martin', role: 'Mobile App Developer', avatar: 'https://randomuser.me/api/portraits/men/30.jpg' },
    { name: 'Noah Wilson', role: 'Product Manager', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Ava Moore', role: 'Scrum Master', avatar: 'https://randomuser.me/api/portraits/men/54.jpg' }
  ];

  const [showTeamLeadDropdown, setShowTeamLeadDropdown] = useState(false);
  const [showMemberSearch, setShowMemberSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    console.log('Project Data:', formData);
    setIsOpen(false);
    setFormData({ title: '', description: '', teamName: '', teamLead: null, teamMembers: [], date: '' });
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={styles.floatingButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 40 40">
          <path fill="#000" fillOpacity=".5" d="M20 0a4 4 0 0 1 4 4v12h12a4 4 0 0 1 0 8H24v12a4 4 0 0 1-8 0V24H4a4 4 0 0 1 0-8h12V4a4 4 0 0 1 4-4Z"/>
        </svg>
      </button>

      {isOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                ...styles.addButton,
                position: 'absolute',
                top: '16px',
                right: '24px'
              }}
            >
              Cancel
            </button>

            <div style={{ height: '32px', marginBottom: '24px' }}></div>


            <div style={styles.formContainer}>
              <div style={styles.inputGroup}>
                <div style={styles.row}>
                  <input
                    type="text"
                    placeholder="Project Title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    style={{ ...styles.input, ...styles.inputTwoThirds }}
                  />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    style={{ ...styles.input, ...styles.inputOneThird }}
                  />
                </div>

                <textarea
                  placeholder="Project Description..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  style={{ ...styles.textarea, ...styles.inputFull }}
                  rows={4}
                />

                <div style={styles.row}>
                  <input
                    type="text"
                    placeholder="Team Name..."
                    value={formData.teamName}
                    onChange={(e) => handleInputChange('teamName', e.target.value)}
                    style={{ ...styles.input, ...styles.inputTwoThirds }}
                  />
                  <div style={{ position: 'relative', flex: 1 }}>
                    <div onClick={() => setShowTeamLeadDropdown(prev => !prev)} style={{ ...styles.input, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {formData.teamLead ? <EmpProfile {...formData.teamLead} /> : <span>Select Team Lead</span>}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ marginLeft: 'auto' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {showTeamLeadDropdown && (
                      <div style={styles.dropdown}>
                        <input
                          type="text"
                          placeholder="Search team lead..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={styles.searchInput}
                        />
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                          {employeeList.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase())).map((emp, i) => (
                            <div key={i} onClick={() => { handleInputChange('teamLead', emp); setShowTeamLeadDropdown(false); setSearchTerm(''); }} style={{ padding: '8px', cursor: 'pointer' }}>
                              <EmpProfile {...emp} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div style={styles.textareaContainer}>
                  <div style={{
                    ...styles.textarea,
                    height: '100%',
                    overflowY: 'auto',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    padding: '12px',
                    alignItems: 'flex-start'
                  }}>
                    {formData.teamMembers.length === 0 ? (
                      <span style={{ color: '#6B7280' }}>Add team members...</span>
                    ) : (
                      formData.teamMembers.map((member, i) => (
                        <div key={i} style={{ transform: 'scale(1.1)' }}>
                          <EmpProfile {...member} />
                        </div>
                      ))
                    )}
                  </div>

                  <button onClick={() => setShowMemberSearch(!showMemberSearch)} style={styles.addMemberButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 19 18">
                      <path fill="#000" fillOpacity=".5" d="M9.469.428c.947 0 1.713.767 1.714 1.714v5.143h5.143a1.714 1.714 0 0 1 0 3.428h-5.143v5.143a1.714 1.714 0 0 1-3.428 0v-5.143H2.61a1.714 1.714 0 1 1 0-3.428h5.144V2.142c0-.947.767-1.714 1.714-1.714Z" />
                    </svg>
                  </button>

                  {showMemberSearch && (
  <div style={{
    ...styles.dropdown,
    top: 'auto',
    bottom: '0',
    width: '250px',
    right: '0',
    left: 'auto'
  }}>
    <input
      type="text"
      placeholder="Search team member..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={styles.searchInput}
    />
    <div style={{ maxHeight: '160px', overflowY: 'auto' }}>
      {employeeList
        .filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((emp, i) => (
          <div
            key={i}
            onClick={() => {
              handleInputChange('teamMembers', [...formData.teamMembers, emp]);
              setShowMemberSearch(false);
              setSearchTerm('');
            }}
            style={{
              padding: '8px',
              cursor: 'pointer',
              backgroundColor: '#BBD3CC',
              borderBottom: '1px solid #e5e7eb'
            }}
          >
            <EmpProfile {...emp} />
          </div>
        ))}
    </div>
  </div>
)}

                </div>

                <div style={styles.buttonContainer}>
                  <button onClick={handleAdd} style={styles.addButton}>Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
