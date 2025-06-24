import React from 'react';

export const GeoFencing = ({ locations = [] }) => {
  return (
    <>
      <div className="map-wrapper">
        {locations.map((loc, index) => {
          const src = `https://www.google.com/maps?q=${loc.lat},${loc.lng}&z=15&output=embed`;

          return (
            <div className="map-card" key={index}>
              {/* Top-left rectangle with address */}
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

      <style>{`
        .map-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 2rem;
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

        @media (max-width: 768px) {
          .map-card iframe {
            height: 18rem;
          }
        }
      `}</style>
    </>
  );
};
