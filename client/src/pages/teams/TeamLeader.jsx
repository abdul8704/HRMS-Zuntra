import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';

export const TeamLeader = () => {
  const { teamLeaderId } = useParams();
  const navigate = useNavigate();
  const [showManagePopup, setShowManagePopup] = useState(false);
  const [popupData, setPopupData] = useState({
    teamName: '',
    teamDescription: '',
    teamLeaderName: '',
    teamMembers: []
  });

  // Enhanced data with 10+ members and multiple projects for each team leader
  const allTeamLeadersData = {
    "john-123": {
      id: "john-123",
      name: "John Doe",
      profileImage: "https://i.pravatar.cc/100?img=1",
      teamName: "AI Wizards",
      teamDescription: "Developing innovative AI solutions using advanced machine learning algorithms and neural networks to create intelligent applications.",
      teamMembers: [
        { id: 1, name: "Alice Johnson", role: "Senior Developer", profileImage: "https://i.pravatar.cc/100?img=10" },
        { id: 2, name: "Bob Smith", role: "ML Engineer", profileImage: "https://i.pravatar.cc/100?img=11" },
        { id: 3, name: "Carol Williams", role: "Data Scientist", profileImage: "https://i.pravatar.cc/100?img=12" },
        { id: 4, name: "David Brown", role: "Backend Developer", profileImage: "https://i.pravatar.cc/100?img=13" },
        { id: 5, name: "Eva Davis", role: "Frontend Developer", profileImage: "https://i.pravatar.cc/100?img=14" },
        { id: 6, name: "Frank Wilson", role: "DevOps Engineer", profileImage: "https://i.pravatar.cc/100?img=15" },
        { id: 7, name: "Grace Lee", role: "UI/UX Designer", profileImage: "https://i.pravatar.cc/100?img=16" },
        { id: 8, name: "Henry Taylor", role: "QA Engineer", profileImage: "https://i.pravatar.cc/100?img=17" },
        { id: 9, name: "Ivy Chen", role: "Product Manager", profileImage: "https://i.pravatar.cc/100?img=18" },
        { id: 10, name: "Jack Martinez", role: "System Analyst", profileImage: "https://i.pravatar.cc/100?img=19" },
        { id: 11, name: "Kate Thompson", role: "AI Research Specialist", profileImage: "https://i.pravatar.cc/100?img=20" },
        { id: 12, name: "Liam Anderson", role: "Cloud Architect", profileImage: "https://i.pravatar.cc/100?img=21" }
      ],
      ongoingProjects: [
        {
          id: 1,
          title: "AI Chatbot Development",
          description: "Developing a smart chatbot using NLP and GPT models for enhanced user interaction and customer support automation.",
          progress: 75,
          deadline: "2025-09-30",
          priority: "High",
          assignedTo: "Alice Johnson",
          assignedProfile: "https://i.pravatar.cc/100?img=10"
        },
        {
          id: 2,
          title: "Voice Recognition System",
          description: "Building advanced voice recognition capabilities using machine learning algorithms for voice-controlled applications.",
          progress: 45,
          deadline: "2025-10-15",
          priority: "Medium",
          assignedTo: "Bob Smith",
          assignedProfile: "https://i.pravatar.cc/100?img=11"
        }
      ],
      completedProjects: [
        {
          id: 3,
          title: "Machine Learning Pipeline",
          description: "Automated ML pipeline for data processing and model deployment with continuous integration and monitoring.",
          completedDate: "2025-07-20",
          rating: 4.8,
          completedBy: "Carol Williams",
          completedProfile: "https://i.pravatar.cc/100?img=12"
        },
        {
          id: 4,
          title: "Neural Network Framework",
          description: "Custom neural network framework optimized for specific AI applications with improved performance metrics.",
          completedDate: "2025-06-15",
          rating: 4.6,
          completedBy: "David Brown",
          completedProfile: "https://i.pravatar.cc/100?img=13"
        }
      ]
    },
    "jane-456": {
      id: "jane-456",
      name: "Jane Smith",
      profileImage: "https://i.pravatar.cc/100?img=2",
      teamName: "Pixel Creators",
      teamDescription: "Redesigning UI/UX for an online store to improve user experience and conversion rates through innovative design solutions.",
      teamMembers: [
        { id: 13, name: "Mason Clark", role: "Senior Designer", profileImage: "https://i.pravatar.cc/100?img=22" },
        { id: 14, name: "Nora Lewis", role: "UX Researcher", profileImage: "https://i.pravatar.cc/100?img=23" },
        { id: 15, name: "Owen Walker", role: "Visual Designer", profileImage: "https://i.pravatar.cc/100?img=24" },
        { id: 16, name: "Penny Hall", role: "Interaction Designer", profileImage: "https://i.pravatar.cc/100?img=25" },
        { id: 17, name: "Quinn Allen", role: "Motion Designer", profileImage: "https://i.pravatar.cc/100?img=26" },
        { id: 18, name: "Ruby Young", role: "Design Researcher", profileImage: "https://i.pravatar.cc/100?img=27" },
        { id: 19, name: "Sam Wright", role: "Creative Director", profileImage: "https://i.pravatar.cc/100?img=28" },
        { id: 20, name: "Tina King", role: "Brand Designer", profileImage: "https://i.pravatar.cc/100?img=29" },
        { id: 21, name: "Uma Scott", role: "Prototyping Specialist", profileImage: "https://i.pravatar.cc/100?img=30" },
        { id: 22, name: "Victor Green", role: "Design Systems Lead", profileImage: "https://i.pravatar.cc/100?img=31" },
        { id: 23, name: "Willow Adams", role: "Content Designer", profileImage: "https://i.pravatar.cc/100?img=32" }
      ],
      ongoingProjects: [
        {
          id: 5,
          title: "E-Commerce Redesign",
          description: "Complete redesign of the e-commerce platform focusing on improved user journey and conversion optimization.",
          progress: 60,
          deadline: "2025-08-15",
          priority: "High",
          assignedTo: "Mason Clark",
          assignedProfile: "https://i.pravatar.cc/100?img=22"
        },
        {
          id: 6,
          title: "Mobile App Interface",
          description: "Designing intuitive mobile application interface with focus on accessibility and user engagement metrics.",
          progress: 35,
          deadline: "2025-09-20",
          priority: "Medium",
          assignedTo: "Nora Lewis",
          assignedProfile: "https://i.pravatar.cc/100?img=23"
        }
      ],
      completedProjects: [
        {
          id: 7,
          title: "Design System Framework",
          description: "Comprehensive design system with reusable components and style guides for consistent brand experience.",
          completedDate: "2025-05-30",
          rating: 4.9,
          completedBy: "Owen Walker",
          completedProfile: "https://i.pravatar.cc/100?img=24"
        },
        {
          id: 8,
          title: "User Research Platform",
          description: "Internal platform for conducting user research and collecting feedback with analytics dashboard.",
          completedDate: "2025-04-22",
          rating: 4.7,
          completedBy: "Penny Hall",
          completedProfile: "https://i.pravatar.cc/100?img=25"
        }
      ]
    },
    "mike-789": {
      id: "mike-789",
      name: "Mike Johnson",
      profileImage: "https://i.pravatar.cc/100?img=3",
      teamName: "Data Analytics Team",
      teamDescription: "Analyzing business data to provide insights and recommendations for strategic decisions through advanced analytics and visualization.",
      teamMembers: [
        { id: 24, name: "Xander Baker", role: "Data Analyst", profileImage: "https://i.pravatar.cc/100?img=33" },
        { id: 25, name: "Yara Nelson", role: "Business Intelligence Specialist", profileImage: "https://i.pravatar.cc/100?img=34" },
        { id: 26, name: "Zoe Carter", role: "Data Engineer", profileImage: "https://i.pravatar.cc/100?img=35" },
        { id: 27, name: "Aaron Mitchell", role: "Statistical Analyst", profileImage: "https://i.pravatar.cc/100?img=36" },
        { id: 28, name: "Bella Roberts", role: "Data Visualization Expert", profileImage: "https://i.pravatar.cc/100?img=37" },
        { id: 29, name: "Connor Turner", role: "Machine Learning Analyst", profileImage: "https://i.pravatar.cc/100?img=38" },
        { id: 30, name: "Diana Phillips", role: "Research Analyst", profileImage: "https://i.pravatar.cc/100?img=39" },
        { id: 31, name: "Ethan Campbell", role: "Data Scientist", profileImage: "https://i.pravatar.cc/100?img=40" },
        { id: 32, name: "Fiona Parker", role: "Analytics Manager", profileImage: "https://i.pravatar.cc/100?img=41" },
        { id: 33, name: "George Evans", role: "Database Specialist", profileImage: "https://i.pravatar.cc/100?img=42" },
        { id: 34, name: "Hannah Edwards", role: "Reporting Analyst", profileImage: "https://i.pravatar.cc/100?img=43" },
        { id: 35, name: "Ian Collins", role: "Predictive Modeler", profileImage: "https://i.pravatar.cc/100?img=44" }
      ],
      ongoingProjects: [
        {
          id: 9,
          title: "Business Intelligence Dashboard",
          description: "Comprehensive BI dashboard providing real-time insights into business performance with interactive visualizations.",
          progress: 80,
          deadline: "2025-11-20",
          priority: "High",
          assignedTo: "Xander Baker",
          assignedProfile: "https://i.pravatar.cc/100?img=33"
        },
        {
          id: 10,
          title: "Predictive Analytics Model",
          description: "Advanced predictive analytics model for forecasting business trends and customer behavior patterns.",
          progress: 55,
          deadline: "2025-12-10",
          priority: "Medium",
          assignedTo: "Yara Nelson",
          assignedProfile: "https://i.pravatar.cc/100?img=34"
        }
      ],
      completedProjects: [
        {
          id: 11,
          title: "Customer Segmentation Analysis",
          description: "Detailed customer segmentation analysis using clustering algorithms to identify key customer groups and behaviors.",
          completedDate: "2025-06-18",
          rating: 4.8,
          completedBy: "Zoe Carter",
          completedProfile: "https://i.pravatar.cc/100?img=35"
        },
        {
          id: 12,
          title: "Sales Performance Analytics",
          description: "Comprehensive sales performance analytics platform with automated reporting and trend analysis capabilities.",
          completedDate: "2025-05-05",
          rating: 4.6,
          completedBy: "Aaron Mitchell",
          completedProfile: "https://i.pravatar.cc/100?img=36"
        }
      ]
    }
  };

  const [teamLeaderData, setTeamLeaderData] = useState(null);

  // Load team leader data based on teamLeaderId parameter
  useEffect(() => {
    const leaderData = allTeamLeadersData[teamLeaderId];
    if (leaderData) {
      setTeamLeaderData(leaderData);
    } else {
      console.error(`Team leader with ID ${teamLeaderId} not found`);
      navigate('/teams');
    }
  }, [teamLeaderId, navigate]);

  // Show loading state while data is being loaded
  if (!teamLeaderData) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading team data...
      </div>
    );
  }

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      overflow: 'hidden'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      gap: '20px',
      padding: '20px',
      overflow: 'hidden'
    },
    leftPanel: {
      width: '350px',
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      height: 'calc(100vh - 40px)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    rightPanel: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      overflow: 'auto'
    },
    teamHeader: {
      marginBottom: '20px',
      flexShrink: 0
    },
    leaderInfoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '15px'
    },
    leaderProfileImage: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      objectFit: 'cover',
      flexShrink: 0
    },
    leaderNameContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    },
    leaderName: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#2c3e50',
      margin: '0',
      lineHeight: '1.2'
    },
    leaderRole: {
      fontSize: '14px',
      color: '#6c757d',
      margin: '2px 0 0 0',
      fontWeight: '500'
    },
    teamName: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#2c3e50',
      margin: '0 0 10px 0',
      borderBottom: '2px solid #e0e0e0',
      paddingBottom: '8px',
      textAlign: 'center'
    },
    teamDescription: {
      fontSize: '14px',
      color: '#5a6c7d',
      lineHeight: '1.5',
      margin: '0',
      textAlign: 'center'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#2c3e50',
      margin: '0 0 20px 0',
      paddingLeft: '10px'
    },
    membersTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '20px 0 15px 0',
      paddingBottom: '8px',
      borderBottom: '2px solid #e0e0e0',
      flexShrink: 0
    },
    membersContainer: {
      flex: 1,
      overflowY: 'auto',
      paddingRight: '8px',
      marginBottom: '20px',
      // Custom scrollbar styling
      scrollbarWidth: 'thin',
      scrollbarColor: '#c1c1c1 #f1f1f1'
    },
    memberCard: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      marginBottom: '8px',
      transition: 'background-color 0.2s ease'
    },
    memberCardHover: {
      backgroundColor: '#e9ecef'
    },
    memberAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      marginRight: '12px',
      objectFit: 'cover'
    },
    memberInfo: {
      flex: 1
    },
    memberName: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0 0 2px 0'
    },
    memberRole: {
      fontSize: '12px',
      color: '#6c757d',
      margin: '0'
    },
    manageButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      flexShrink: 0
    },
    manageButtonHover: {
      backgroundColor: '#357abd'
    },
    projectsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'flex-start',
      paddingLeft: '10px'
    },
    projectCard: {
      backgroundColor: '#a8d5ba',
      borderRadius: '12px',
      padding: '20px',
      width: '320px',
      minHeight: '200px',
      maxWidth: 'calc(50% - 10px)', // Responsive: 2 cards per row on larger screens
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      position: 'relative',
      cursor: 'pointer'
    },
    completedProjectCard: {
      backgroundColor: '#fadbd8',
      borderRadius: '12px',
      padding: '20px',
      width: '320px',
      minHeight: '200px',
      maxWidth: 'calc(50% - 10px)', // Responsive: 2 cards per row on larger screens
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      position: 'relative',
      cursor: 'pointer'
    },
    projectCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
    },
    projectHeader: {
      marginBottom: '16px'
    },
    projectTitle: {
      margin: '0',
      fontSize: '20px',
      fontWeight: '600',
      color: '#2c3e50',
      lineHeight: '1.2'
    },
    projectDescription: {
      marginBottom: '20px'
    },
    projectDescriptionText: {
      margin: '0',
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#34495e'
    },
    projectInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginTop: 'auto'
    },
    projectAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      flexShrink: '0'
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    projectDetails: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    },
    assignedName: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0 0 2px 0'
    },
    projectMeta: {
      fontSize: '12px',
      color: '#5a6c7d',
      fontWeight: '500',
      margin: '0'
    },
    progressContainer: {
      margin: '10px 0'
    },
    progressBar: {
      width: '100%',
      height: '6px',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '3px',
      overflow: 'hidden',
      marginBottom: '5px'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#4ade80',
      borderRadius: '3px',
      transition: 'width 0.3s ease'
    },
    progressText: {
      fontSize: '12px',
      color: '#2c3e50',
      fontWeight: '600'
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      marginTop: '10px'
    },
    rating: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50'
    },
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
      padding: '30px',
      borderRadius: '16px',
      width: '600px',
      maxWidth: '90%',
      maxHeight: '90%',
      overflowY: 'auto',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
      borderBottom: '2px solid #e0e0e0',
      paddingBottom: '15px'
    },
    modalTitle: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#2c3e50',
      margin: '0'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '28px',
      cursor: 'pointer',
      color: '#999',
      padding: '5px',
      lineHeight: '1'
    },
    formSection: {
      marginBottom: '25px'
    },
    formLabel: {
      display: 'block',
      fontSize: '16px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '8px'
    },
    formInput: {
      width: '100%',
      padding: '12px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'inherit',
      transition: 'border-color 0.2s ease',
      outline: 'none'
    },
    formTextarea: {
      width: '100%',
      padding: '12px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'inherit',
      resize: 'vertical',
      minHeight: '80px',
      transition: 'border-color 0.2s ease',
      outline: 'none'
    },
    membersSection: {
      marginBottom: '25px'
    },
    membersContainer2: {
      maxHeight: '200px',
      overflowY: 'auto',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      padding: '10px'
    },
    popupMemberCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      marginBottom: '8px'
    },
    popupMemberInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flex: 1
    },
    popupMemberAvatar: {
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    popupMemberDetails: {
      display: 'flex',
      flexDirection: 'column'
    },
    popupMemberName: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0'
    },
    popupMemberRole: {
      fontSize: '12px',
      color: '#6c757d',
      margin: '0'
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '6px 12px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    deleteButtonHover: {
      backgroundColor: '#c82333'
    },
    buttonContainer: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'flex-end',
      paddingTop: '20px',
      borderTop: '2px solid #e0e0e0',
      marginTop: '25px'
    },
    cancelButton: {
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    cancelButtonHover: {
      backgroundColor: '#5a6268'
    },
    saveButton: {
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    saveButtonHover: {
      backgroundColor: '#218838'
    }
  };

  const handleManageTeam = () => {
    setPopupData({
      teamName: teamLeaderData.teamName,
      teamDescription: teamLeaderData.teamDescription,
      teamLeaderName: teamLeaderData.name,
      teamMembers: [...teamLeaderData.teamMembers]
    });
    setShowManagePopup(true);
  };

  const closePopup = () => {
    setShowManagePopup(false);
    setPopupData({
      teamName: '',
      teamDescription: '',
      teamLeaderName: '',
      teamMembers: []
    });
  };

  const handleInputChange = (field, value) => {
    setPopupData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const removeMember = (memberId) => {
    setPopupData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(member => member.id !== memberId)
    }));
  };

  const handleSave = () => {
    setTeamLeaderData(prev => ({
      ...prev,
      teamName: popupData.teamName,
      teamDescription: popupData.teamDescription,
      name: popupData.teamLeaderName,
      teamMembers: popupData.teamMembers
    }));
    
    console.log('Saving team data:', popupData);
    closePopup();
  };

  return (
    <>
      <div style={styles.container}>
        <Sidebar role="EMP" />
        
        <div style={styles.mainContent}>
          {/* Left Panel */}
          <div style={styles.leftPanel}>
            <div style={styles.teamHeader}>
              <div style={styles.leaderInfoContainer}>
                <img
                  src={teamLeaderData.profileImage}
                  alt={teamLeaderData.name}
                  style={styles.leaderProfileImage}
                />
                <div style={styles.leaderNameContainer}>
                  <h4 style={styles.leaderName}>{teamLeaderData.name}</h4>
                  <p style={styles.leaderRole}>Team Leader</p>
                </div>
              </div>
              
              <h2 style={styles.teamName}>{teamLeaderData.teamName}</h2>
              <p style={styles.teamDescription}>{teamLeaderData.teamDescription}</p>
            </div>

            <h3 style={styles.membersTitle}>Team Members ({teamLeaderData.teamMembers.length})</h3>
            
            <div style={styles.membersContainer}>
              {teamLeaderData.teamMembers.map(member => (
                <div
                  key={member.id}
                  style={styles.memberCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = styles.memberCardHover.backgroundColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = styles.memberCard.backgroundColor;
                  }}
                >
                  <img
                    src={member.profileImage}
                    alt={member.name}
                    style={styles.memberAvatar}
                  />
                  <div style={styles.memberInfo}>
                    <p style={styles.memberName}>{member.name}</p>
                    <p style={styles.memberRole}>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              style={styles.manageButton}
              onClick={handleManageTeam}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = styles.manageButtonHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = styles.manageButton.backgroundColor;
              }}
            >
              Manage Team
            </button>
          </div>

          {/* Right Panel - Projects */}
          <div style={styles.rightPanel}>
            {/* Ongoing Projects */}
            <div>
              <h1 style={styles.sectionTitle}>Ongoing Projects ({teamLeaderData.ongoingProjects.length})</h1>
              <div style={styles.projectsContainer}>
                {teamLeaderData.ongoingProjects.map(project => (
                  <div
                    key={project.id}
                    style={styles.projectCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = styles.projectCardHover.transform;
                      e.currentTarget.style.boxShadow = styles.projectCardHover.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <div style={styles.projectHeader}>
                      <h3 style={styles.projectTitle}>{project.title}</h3>
                    </div>
                    
                    <div style={styles.projectDescription}>
                      <p style={styles.projectDescriptionText}>{project.description}</p>
                    </div>

                    <div style={styles.progressContainer}>
                      <div style={styles.progressBar}>
                        <div 
                          style={{
                            ...styles.progressFill,
                            width: `${project.progress}%`
                          }}
                        ></div>
                      </div>
                      <p style={styles.progressText}>Progress: {project.progress}% • Due: {project.deadline}</p>
                    </div>
                    
                    <div style={styles.projectInfo}>
                      <div style={styles.projectAvatar}>
                        <img 
                          src={project.assignedProfile} 
                          alt={project.assignedTo}
                          style={styles.avatarImage}
                        />
                      </div>
                      <div style={styles.projectDetails}>
                        <span style={styles.assignedName}>{project.assignedTo}</span>
                        <span style={styles.projectMeta}>Assigned Developer</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Projects */}
            <div>
              <h1 style={styles.sectionTitle}>Completed Projects ({teamLeaderData.completedProjects.length})</h1>
              <div style={styles.projectsContainer}>
                {teamLeaderData.completedProjects.map(project => (
                  <div
                    key={project.id}
                    style={styles.completedProjectCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = styles.projectCardHover.transform;
                      e.currentTarget.style.boxShadow = styles.projectCardHover.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <div style={styles.projectHeader}>
                      <h3 style={styles.projectTitle}>{project.title}</h3>
                    </div>
                    
                    <div style={styles.projectDescription}>
                      <p style={styles.projectDescriptionText}>{project.description}</p>
                    </div>

                    <div style={styles.ratingContainer}>
                      <span style={styles.rating}>⭐ {project.rating}</span>
                      <span style={styles.projectMeta}>• Completed: {project.completedDate}</span>
                    </div>
                    
                    <div style={styles.projectInfo}>
                      <div style={styles.projectAvatar}>
                        <img 
                          src={project.completedProfile} 
                          alt={project.completedBy}
                          style={styles.avatarImage}
                        />
                      </div>
                      <div style={styles.projectDetails}>
                        <span style={styles.assignedName}>{project.completedBy}</span>
                        <span style={styles.projectMeta}>Completed By</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Manage Team Popup */}
      {showManagePopup && (
        <div style={styles.modal} onClick={closePopup}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Manage Team</h2>
              <button style={styles.closeButton} onClick={closePopup}>×</button>
            </div>

            <div style={styles.formSection}>
              <label style={styles.formLabel}>Team Name</label>
              <input
                type="text"
                value={popupData.teamName}
                onChange={(e) => handleInputChange('teamName', e.target.value)}
                style={styles.formInput}
                placeholder="Enter team name"
              />
            </div>

            <div style={styles.formSection}>
              <label style={styles.formLabel}>Team Description</label>
              <textarea
                value={popupData.teamDescription}
                onChange={(e) => handleInputChange('teamDescription', e.target.value)}
                style={styles.formTextarea}
                placeholder="Enter team description"
              />
            </div>

            <div style={styles.formSection}>
              <label style={styles.formLabel}>Team Leader Name</label>
              <input
                type="text"
                value={popupData.teamLeaderName}
                onChange={(e) => handleInputChange('teamLeaderName', e.target.value)}
                style={styles.formInput}
                placeholder="Enter team leader name"
              />
            </div>

            <div style={styles.membersSection}>
              <label style={styles.formLabel}>Team Members ({popupData.teamMembers.length})</label>
              <div style={styles.membersContainer2}>
                {popupData.teamMembers.map(member => (
                  <div key={member.id} style={styles.popupMemberCard}>
                    <div style={styles.popupMemberInfo}>
                      <img
                        src={member.profileImage}
                        alt={member.name}
                        style={styles.popupMemberAvatar}
                      />
                      <div style={styles.popupMemberDetails}>
                        <p style={styles.popupMemberName}>{member.name}</p>
                        <p style={styles.popupMemberRole}>{member.role}</p>
                      </div>
                    </div>
                    <button
                      style={styles.deleteButton}
                      onClick={() => removeMember(member.id)}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = styles.deleteButtonHover.backgroundColor;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = styles.deleteButton.backgroundColor;
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {popupData.teamMembers.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#6c757d', padding: '20px' }}>
                    No team members found
                  </p>
                )}
              </div>
            </div>

            <div style={styles.buttonContainer}>
              <button
                style={styles.cancelButton}
                onClick={closePopup}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = styles.cancelButtonHover.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = styles.cancelButton.backgroundColor;
                }}
              >
                Cancel
              </button>
              <button
                style={styles.saveButton}
                onClick={handleSave}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = styles.saveButtonHover.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = styles.saveButton.backgroundColor;
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add responsive styles */}
      <style>{`
        @media (max-width: 1200px) {
          .projectsContainer {
            justify-content: center !important;
          }
        }
        
        @media (max-width: 768px) {
          .projectCard, .completedProjectCard {
            width: 100% !important;
            max-width: none !important;
          }
          
          .leftPanel {
            width: 300px !important;
          }
        }
        
        /* Custom scrollbar */
        .membersContainer::-webkit-scrollbar {
          width: 6px;
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
      `}</style>
    </>
  );
};
