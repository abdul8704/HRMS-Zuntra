import React from 'react';

export const GeoFencing = ({ locations }) => {
  const renderMap = (lat, lng, title) => {
    const src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    return (
      <div className="map-card" key={title}>
        <iframe
          title={title}
          src={src}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  };

  return (
    <>
      <div className="map-wrapper">
        {locations.map((loc, index) =>
          renderMap(loc.lat, loc.lng, loc.title || `Map${index + 1}`)
        )}
      </div>

      <style>{`
        .map-wrapper {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-height: 90vh;
          overflow-y: auto;
          padding-right: 10px;
        }

        .map-card {
          height: 800px;
          overflow: auto;
          border-radius: 8px;
          padding: 10px;
          background-color: white;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
        }

        .map-card iframe {
          width: 100%;
          height: 1000px;
          border: none;
          border-radius: 8px;
        }

        @media (max-width: 1024px) {
          .map-card {
            height: 600px;
          }

          .map-card iframe {
            height: 800px;
          }
        }
      `}</style>
    </>
  );
};
