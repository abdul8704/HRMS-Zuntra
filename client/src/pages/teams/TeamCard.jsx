import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeamCard = ({ 
  teamName, 
  teamDescription, 
  teamLeaderName, 
  profileImage,
  teamLeaderId,
  onImageUpdate
}) => {
  const navigate = useNavigate();
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [currentImage, setCurrentImage] = useState(profileImage);

  // Add this click handler for the entire card
  const handleCardClick = () => {
    // Convert team name to URL-friendly format
    const teamId = teamName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    navigate(`/team-details/${teamId}`);
  };

  const handleTeamLeaderClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking team leader name
    navigate(`/team-leader/${teamLeaderId}`);
  };

  const handleImageEdit = (e) => {
    e.stopPropagation(); // Prevent card click when editing image
    setIsEditingImage(true);
    setNewImageUrl(currentImage);
  };

  const handleImageSave = () => {
    setCurrentImage(newImageUrl);
    setIsEditingImage(false);
    // Call parent component's update function if provided
    if (onImageUpdate) {
      onImageUpdate(teamLeaderId, newImageUrl);
    }
  };

  const handleImageCancel = () => {
    setIsEditingImage(false);
    setNewImageUrl('');
  };

  const handleImageError = (e) => {
    e.target.src = `https://ui-avatars.com/api/?name=${teamLeaderName}&background=4a90e2&color=fff&size=40`;
  };

  const styles = {
    teamCard: {
      backgroundColor: '#a8d5ba',
      borderRadius: '12px',
      padding: '20px',
      margin: '16px',
      width: '320px',
      minHeight: '180px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      position: 'relative',
      cursor: 'pointer'
    },
    teamCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
    },
    teamHeader: {
      marginBottom: '16px'
    },
    teamName: {
      margin: '0',
      fontSize: '20px',
      fontWeight: '600',
      color: '#2c3e50',
      lineHeight: '1.2'
    },
    teamDescription: {
      marginBottom: '20px'
    },
    descriptionText: {
      margin: '0',
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#34495e'
    },
    teamLeaderInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginTop: 'auto'
    },
    leaderAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      flexShrink: '0',
      position: 'relative',
      cursor: 'pointer'
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    editIcon: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      width: '16px',
      height: '16px',
      backgroundColor: '#4a90e2',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '10px',
      color: 'white',
      border: '2px solid white'
    },
    leaderDetails: {
      display: 'flex',
      flexDirection: 'column'
    },
    leaderName: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '2px',
      cursor: 'pointer',
      transition: 'color 0.2s ease'
    },
    leaderNameHover: {
      color: '#1976d2',
      textDecoration: 'underline'
    },
    leaderTitle: {
      fontSize: '12px',
      color: '#5a6c7d',
      fontWeight: '500'
    },
    // Modal styles
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      width: '400px',
      maxWidth: '90%'
    },
    modalTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '15px',
      color: '#2c3e50'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '14px',
      marginBottom: '15px',
      outline: 'none',
      transition: 'border-color 0.2s ease'
    },
    inputFocus: {
      borderColor: '#4a90e2'
    },
    previewContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px'
    },
    previewImage: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid #e0e0e0'
    },
    buttonContainer: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'flex-end'
    },
    button: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s ease'
    },
    saveButton: {
      backgroundColor: '#4ade80',
      color: 'white'
    },
    cancelButton: {
      backgroundColor: '#e5e7eb',
      color: '#374151'
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isNameHovered, setIsNameHovered] = useState(false);

  return (
    <>
      <div 
        style={{
          ...styles.teamCard,
          ...(isHovered ? styles.teamCardHover : {})
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div style={styles.teamHeader}>
          <h3 style={styles.teamName}>{teamName}</h3>
        </div>
        
        <div style={styles.teamDescription}>
          <p style={styles.descriptionText}>{teamDescription}</p>
        </div>
        
        <div style={styles.teamLeaderInfo}>
          <div style={styles.leaderAvatar} onClick={handleImageEdit}>
            <img 
              src={currentImage || `https://ui-avatars.com/api/?name=${teamLeaderName}&background=4a90e2&color=fff&size=40`}
              alt={teamLeaderName}
              style={styles.avatarImage}
              onError={handleImageError}
            />
            <div style={styles.editIcon}>
              ✏️
            </div>
          </div>
          <div style={styles.leaderDetails}>
            <span 
              style={{
                ...styles.leaderName,
                ...(isNameHovered ? styles.leaderNameHover : {})
              }}
              onClick={handleTeamLeaderClick}
              onMouseEnter={() => setIsNameHovered(true)}
              onMouseLeave={() => setIsNameHovered(false)}
            >
              {teamLeaderName}
            </span>
            <span style={styles.leaderTitle}>Team Leader</span>
          </div>
        </div>
      </div>

      {/* Image Edit Modal */}
      {isEditingImage && (
        <div style={styles.modal} onClick={handleImageCancel}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Edit Profile Image</h3>
            
            <input
              type="text"
              placeholder="Enter image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              style={styles.input}
              autoFocus
            />
            
            <div style={styles.previewContainer}>
              <img
                src={newImageUrl || `https://ui-avatars.com/api/?name=${teamLeaderName}&background=4a90e2&color=fff&size=60`}
                alt="Preview"
                style={styles.previewImage}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${teamLeaderName}&background=4a90e2&color=fff&size=60`;
                }}
              />
              <div>
                <p style={{ margin: '0', fontSize: '14px', fontWeight: '500' }}>Preview</p>
                <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>This is how the image will look</p>
              </div>
            </div>

            <div style={styles.buttonContainer}>
              <button
                style={{ ...styles.button, ...styles.cancelButton }}
                onClick={handleImageCancel}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.button, ...styles.saveButton }}
                onClick={handleImageSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamCard;
