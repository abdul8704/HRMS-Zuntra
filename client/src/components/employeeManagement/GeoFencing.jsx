import React from 'react';
import AddLocationForm from './AddLocationForm'
import {useState} from 'react'
export const GeoFencing = ({ locations = [] }) => {

  const [showForm, setShowForm] = useState(false);

  const handleAddButton = () => {
    setShowForm(true); // this will show the form
  };

  const handleClose = () => {
    setShowForm(false); // this will hide the form
  };

  return (
    <>
      {showForm && <AddLocationForm onClose={handleClose} />}
      <div className="map-wrapper">
        {locations.map((loc, index) => {
          const src = `https://www.google.com/maps?q=${loc.lat},${loc.lng}&z=15&output=embed`;

          return (
            <div className="map-card" key={index}>
              <iframe
                title={loc.title || `Map${index + 1}`}
                src={src}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          );
        })}
      </div>

      {/* Fixed "+" Button */}
      <button className="floating-button" onClick={handleAddButton}>+</button>

      <style>{`
        .map-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 2rem;
        }

        .map-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          width: 80vw;
        }

        .map-card iframe {
          width: 100%;
          height: 22rem;
          border: none;
        }

        .address-inside-map {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(255, 255, 255, 0.9);
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          font-size: 1rem;
          font-weight: 500;
          color: #222;
          max-width: 90%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .floating-button {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          border: none;
          background-color: #7da695;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 999;
        }

        .floating-button:hover {
          background-color: #689a85;
        }

        @media (max-width: 768px) {
          .map-card iframe {
            height: 18rem;
          }

          .floating-button {
            width: 3rem;
            height: 3rem;
            font-size: 1.5rem;
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </>
  );
};
