import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';

export const TeamDetails = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  // Sample team data - you can replace with API calls
  const allTeamsData = {
    "ai-wizards": {
      id: "ai-wizards",
      teamName: "AI Wizards",
      teamDescription: "Developing innovative AI solutions using advanced machine learning algorithms and neural networks to create intelligent applications for various industries.",
      teamMembers: [
        {
          id: 1,
          name: "Alice Johnson",
          email: "alice.johnson@zuntra.com",
          phone: "+91 9876543210",
          role: "Senior Developer",
          profileImage: "https://i.pravatar.cc/100?img=10"
        },
        {
          id: 2,
          name: "Bob Smith",
          email: "bob.smith@zuntra.com", 
          phone: "+91 9876543211",
          role: "ML Engineer",
          profileImage: "https://i.pravatar.cc/100?img=11"
        },
        {
          id: 3,
          name: "Carol Williams",
          email: "carol.williams@zuntra.com",
          phone: "+91 9876543212", 
          role: "Data Scientist",
          profileImage: "https://i.pravatar.cc/100?img=12"
        },
        {
          id: 4,
          name: "David Brown",
          email: "david.brown@zuntra.com",
          phone: "+91 9876543213",
          role: "Backend Developer", 
          profileImage: "https://i.pravatar.cc/100?img=13"
        },
        {
          id: 5,
          name: "Eva Davis",
          email: "eva.davis@zuntra.com",
          phone: "+91 9876543214",
          role: "Frontend Developer",
          profileImage: "https://i.pravatar.cc/100?img=14"
        },
        {
          id: 6,
          name: "Frank Wilson",
          email: "frank.wilson@zuntra.com",
          phone: "+91 9876543215",
          role: "DevOps Engineer",
          profileImage: "https://i.pravatar.cc/100?img=15"
        },
        {
          id: 7,
          name: "Grace Lee",
          email: "grace.lee@zuntra.com", 
          phone: "+91 9876543216",
          role: "UI/UX Designer",
          profileImage: "https://i.pravatar.cc/100?img=16"
        },
        {
          id: 8,
          name: "Henry Taylor",
          email: "henry.taylor@zuntra.com",
          phone: "+91 9876543217",
          role: "QA Engineer", 
          profileImage: "https://i.pravatar.cc/100?img=17"
        },
        {
          id: 9,
          name: "Ivy Chen",
          email: "ivy.chen@zuntra.com",
          phone: "+91 9876543218",
          role: "Product Manager",
          profileImage: "https://i.pravatar.cc/100?img=18"
        },
        {
          id: 10,
          name: "Jack Martinez", 
          email: "jack.martinez@zuntra.com",
          phone: "+91 9876543219",
          role: "System Analyst",
          profileImage: "https://i.pravatar.cc/100?img=19"
        },
        {
          id: 11,
          name: "Kate Thompson",
          email: "kate.thompson@zuntra.com",
          phone: "+91 9876543220", 
          role: "AI Research Specialist",
          profileImage: "https://i.pravatar.cc/100?img=20"
        },
        {
          id: 12,
          name: "Liam Anderson",
          email: "liam.anderson@zuntra.com",
          phone: "+91 9876543221",
          role: "Cloud Architect",
          profileImage: "https://i.pravatar.cc/100?img=21"
        }
      ]
    },
    "pixel-creators": {
      id: "pixel-creators", 
      teamName: "Pixel Creators",
      teamDescription: "Redesigning UI/UX for an online store to improve user experience and conversion rates through innovative design solutions.",
      teamMembers: [
        {
          id: 13,
          name: "Mason Clark",
          email: "mason.clark@zuntra.com",
          phone: "+91 9876543222",
          role: "Senior Designer",
          profileImage: "https://i.pravatar.cc/100?img=22"
        },
        {
          id: 14,
          name: "Nora Lewis",
          email: "nora.lewis@zuntra.com", 
          phone: "+91 9876543223",
          role: "UX Researcher",
          profileImage: "https://i.pravatar.cc/100?img=23"
        }
      ]
    },
    "data-analytics-team": {
      id: "data-analytics-team",
      teamName: "Data Analytics Team", 
      teamDescription: "Analyzing business data to provide insights and recommendations for strategic decisions through advanced analytics and visualization.",
      teamMembers: [
        {
          id: 24,
          name: "Xander Baker",
          email: "xander.baker@zuntra.com",
          phone: "+91 9876543230",
          role: "Data Analyst", 
          profileImage: "https://i.pravatar.cc/100?img=33"
        }
      ]
    }
  };

  const [teamData, setTeamData] = useState(null);

  // Load team data based on teamId parameter
  useEffect(() => {
    const team = allTeamsData[teamId];
    if (team) {
      setTeamData(team);
    } else {
      console.error(`Team with ID ${teamId} not found`);
      navigate('/projects/teams');
    }
  }, [teamId, navigate]);

  // Show loading state while data is being loaded
  if (!teamData) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading team details...
      </div>
    );
  }

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      overflow: 'hidden'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      gap: '0',
      height: '100vh',
      overflow: 'hidden'
    },
    leftPanel: {
      width: '400px',
      backgroundColor: '#bcd4cd',
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      height: '100vh'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#2c3e50',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      marginBottom: '30px',
      padding: '8px 0'
    },
    backArrow: {
      marginRight: '8px',
      fontSize: '18px'
    },
    profileSection: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    profileIcon: {
      width: '80px',
      height: '80px',
      backgroundColor: '#fdbcb4',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px auto',
      fontSize: '32px',
      color: '#2c3e50'
    },
    teamName: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#2c3e50',
      margin: '0 0 15px 0',
      lineHeight: '1.2'
    },
    teamDescription: {
      fontSize: '16px',
      color: '#5a6c7d',
      lineHeight: '1.6',
      margin: '0',
      textAlign: 'left',
      fontWeight: '400'
    },
    rightPanel: {
      flex: 1,
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden'
    },
    membersHeader: {
      padding: '20px',
      borderBottom: '1px solid #e0e0e0',
      flexShrink: 0
    },
    membersTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0'
    },
    membersContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      scrollbarWidth: 'thin',
      scrollbarColor: '#c1c1c1 #f1f1f1'
    },
    memberCard: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      marginBottom: '12px',
      borderRadius: '8px',
      transition: 'transform 0.2s ease',
      cursor: 'pointer'
    },
    memberCardHover: {
      transform: 'translateY(-1px)'
    },
    // Color variations for member cards
    memberCardWhite: {
      backgroundColor: 'white',
      border: '1px solid #e0e0e0'
    },
    memberCardPink: {
      backgroundColor: '#fdbcb4'
    },
    memberCardBlue: {
      backgroundColor: '#b3d9ff'
    },
    memberCardYellow: {
      backgroundColor: '#fff2cc'
    },
    memberCardLightGreen: {
      backgroundColor: '#d4edda'
    },
    checkIcon: {
      width: '20px',
      height: '20px',
      backgroundColor: '#4ade80',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '15px',
      color: 'white',
      fontSize: '12px',
      flexShrink: 0,
      fontWeight: 'bold'
    },
    memberAvatar: {
      width: '50px',
      height: '50px',
      borderRadius: '8px',
      marginRight: '15px',
      objectFit: 'cover',
      flexShrink: 0
    },
    memberInfo: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    memberName: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#2c3e50',
      margin: '0 0 4px 0'
    },
    memberEmail: {
      fontSize: '14px',
      color: '#6c757d',
      margin: '0 0 2px 0',
      display: 'flex',
      alignItems: 'center'
    },
    memberPhone: {
      fontSize: '14px',
      color: '#6c757d',
      margin: '0 0 8px 0',
      display: 'flex',
      alignItems: 'center'
    },
    memberRole: {
      fontSize: '12px',
      fontWeight: '600',
      padding: '4px 8px',
      borderRadius: '12px',
      color: 'white',
      alignSelf: 'flex-start'
    },
    // Different role colors
    developerRole: {
      backgroundColor: '#4ade80'
    },
    designerRole: {
      backgroundColor: '#3b82f6'
    },
    managerRole: {
      backgroundColor: '#f59e0b'
    },
    analystRole: {
      backgroundColor: '#8b5cf6'
    },
    engineerRole: {
      backgroundColor: '#06b6d4'
    }
  };

  const getBackgroundColor = (index) => {
    const colors = [
      styles.memberCardWhite,
      styles.memberCardPink, 
      styles.memberCardBlue, 
      styles.memberCardYellow,
      styles.memberCardLightGreen
    ];
    return colors[index % colors.length];
  };

  const getRoleStyle = (role) => {
    const roleKey = role.toLowerCase();
    if (roleKey.includes('developer')) return styles.developerRole;
    if (roleKey.includes('designer') || roleKey.includes('ui') || roleKey.includes('ux')) return styles.designerRole;
    if (roleKey.includes('manager') || roleKey.includes('lead')) return styles.managerRole;
    if (roleKey.includes('analyst') || roleKey.includes('scientist')) return styles.analystRole;
    if (roleKey.includes('engineer')) return styles.engineerRole;
    return styles.developerRole;
  };

  const handleBackClick = () => {
    navigate('/teams');
  };

  return (
    <>
      <div style={styles.container}>
        
        <div style={styles.mainContent}>
          {/* Left Panel - Only Team Name and Description */}
          <div style={styles.leftPanel}>
            <button style={styles.backButton} onClick={handleBackClick}>
              <span style={styles.backArrow}>←</span>
              Back
            </button>
            
            <div style={styles.profileSection}>
              <div style={styles.profileIcon}>
                👥
              </div>
              <h1 style={styles.teamName}>{teamData.teamName}</h1>
              <p style={styles.teamDescription}>{teamData.teamDescription}</p>
            </div>
          </div>

          {/* Right Panel - Team Members List */}
          <div style={styles.rightPanel}>
            <div style={styles.membersHeader}>
              <h2 style={styles.membersTitle}>Team Members ({teamData.teamMembers.length})</h2>
            </div>
            
            <div style={styles.membersContainer}>
              {teamData.teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  style={{
                    ...styles.memberCard,
                    ...getBackgroundColor(index)
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = styles.memberCardHover.transform;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div style={styles.checkIcon}>
                    ✓
                  </div>
                  
                  <img
                    src={member.profileImage}
                    alt={member.name}
                    style={styles.memberAvatar}
                  />
                  
                  <div style={styles.memberInfo}>
                    <h3 style={styles.memberName}>{member.name}</h3>
                    <p style={styles.memberEmail}>
                      <span style={{marginRight: '5px'}}>✉</span>
                      {member.email}
                    </p>
                    <p style={styles.memberPhone}>
                      <span style={{marginRight: '5px'}}>📞</span>
                      {member.phone}
                    </p>
                    <span style={{
                      ...styles.memberRole,
                      ...getRoleStyle(member.role)
                    }}>
                      {member.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .membersContainer::-webkit-scrollbar {
          width: 8px;
        }
        
        .membersContainer::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .membersContainer::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        
        .membersContainer::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        @media (max-width: 768px) {
          .leftPanel {
            width: 300px !important;
          }
        }
      `}</style>
    </>
  );
};
