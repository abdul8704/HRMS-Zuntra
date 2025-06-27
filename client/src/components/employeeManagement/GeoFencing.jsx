import React from 'react';

export const GeoFencing = ({ embedUrl, branchName }) => {
  if (!embedUrl || !embedUrl.includes("https://www.google.com/maps/embed")) return null;

  return (
    <>
      <div className="map-wrapper">
        <h3 className="map-title">{branchName}</h3>
        <div className="map-card">
          <iframe
            title="Map Location"
            src={embedUrl}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <style>{`
        .map-wrapper {
          padding: 1rem;
          width: 100%;
        }

        .map-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          width: 100%;
        }

        .map-card iframe {
          width: 100%;
          height: 22rem;
          border: none;
        }

        .map-title {
          font-size: 2.25rem;
          font-weight: 1000;
          padding: 1.0rem 0.5rem;
          color:rgba(0, 0, 0, 0.64);
        }

        @media (max-width: 768px) {
          .map-card iframe {
            height: 18rem;
          }
        }
      `}</style>
    </>
  );
};
