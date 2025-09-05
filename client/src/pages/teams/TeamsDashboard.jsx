import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import TeamCard from './TeamCard';
import { Sidebar } from '../../components/Sidebar';

export const TeamsDashboard = () => {
  const [teams, setTeams] = useState([
    {
      teamName: "AI Wizards",
      teamDescription: "Developing a smart chatbot using NLP and GPT models for enhanced user interaction.",
      teamLeaderName: "John Doe",
      profileImage: "https://i.pravatar.cc/100?img=1",
      teamLeaderId: "john-123"
    },
    {
      teamName: "Pixel Creators", 
      teamDescription: "Redesigning UI/UX for an online store to improve user experience and conversion rates.",
      teamLeaderName: "Jane Smith",
      profileImage: "https://i.pravatar.cc/100?img=2",
      teamLeaderId: "jane-456"
    },
    {
      teamName: "Data Analytics Team",
      teamDescription: "Analyzing business data to provide insights and recommendations for strategic decisions.",
      teamLeaderName: "Mike Johnson",
      profileImage: "https://i.pravatar.cc/100?img=3",
      teamLeaderId: "mike-789"
    }
  ]);

  // Handle image updates
  const handleImageUpdate = (teamLeaderId, newImageUrl) => {
    setTeams(prevTeams => 
      prevTeams.map(team => 
        team.teamLeaderId === teamLeaderId 
          ? { ...team, profileImage: newImageUrl }
          : team
      )
    );
    
    // Optional: Save to backend
    console.log(`Updated image for ${teamLeaderId}: ${newImageUrl}`);
  };

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  };

  const contentStyle = {
    flex: 1,
    padding: '20px',
    marginLeft: '0',
    overflowX: 'auto'
  };

  const titleStyle = {
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '32px',
    fontWeight: '600',
    paddingLeft: '10px'
  };

  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'flex-start',
    paddingLeft: '10px'
  };

  return (
    <div style={containerStyle}>
      <Sidebar role="HR" />
      
      <div style={contentStyle}>
        <h1 style={titleStyle}>Teams Dashboard</h1>
        <div style={gridStyle}>
          {teams.map((team, index) => (
            <TeamCard
              key={`team-${index}`}
              teamName={team.teamName}
              teamDescription={team.teamDescription}
              teamLeaderName={team.teamLeaderName}
              profileImage={team.profileImage}
              teamLeaderId={team.teamLeaderId}
              onImageUpdate={handleImageUpdate} // Pass the update handler
            />
          ))}
        </div>
      </div>
    </div>
  );
};
