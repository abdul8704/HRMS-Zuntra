import React from 'react';
import { UpskillSideBar } from "../components/upskill/UpskillSideBar";
import { VideoPlayer } from "../components/upskill/VideoPlayer";
import { DescriptionSection } from '../components/upskill/DescriptionSection';
import { AssignmentsSection } from '../components/upskill/AssignmentsSection';

export const HrUpskillSideBar = () => {
  return (
    <div style={{ display: 'flex', overflowX: 'hidden' }}>
      {/* Sidebar (fixed width) */}
      <UpskillSideBar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '0 1.5rem',
          marginLeft: '260px', // Sidebar width
          fontFamily: 'Segoe UI, sans-serif',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Top Spacing */}
        <div style={{ height: '25px' }}></div>

        {/* Submodule Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#000',
          marginBottom: '1rem',
        }}>
          <div
            style={{
              width: '4px',
              height: '24px',
              backgroundColor: '#009688',
              marginRight: '10px',
              borderRadius: '2px',
            }}
          />
          Sub Module 2 Name
        </div>

        {/* Video → Description → Assignment (vertical stacking) */}
        <VideoPlayer />
        <DescriptionSection />
        <AssignmentsSection />
      </div>
    </div>
  );
};
