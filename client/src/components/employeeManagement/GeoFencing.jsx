import React from 'react';
import { Sidebar } from "../../components/Sidebar";
import { EmpNavbar } from "../employeeManagement/EmpNavbar";

export const GeoFencing = () => {
  // ✅ Function that returns a map card with scrollable iframe
  const renderMap = (lat, lng, title) => {
    const src = `https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${lat},${lng}&zoom=15`;
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
    <div className="website-container">
      <Sidebar />
      <div className="website-module">
        <EmpNavbar />

        <div className="map-wrapper">
          {renderMap(12.979545214368582, 80.22630407471307, "Map1")}
          {renderMap(12.9715987, 77.5945627, "Map2")}
          {renderMap(13.0826802, 80.2707184, "Map3")}
          {renderMap(12.965365, 80.246109, "Perungudi")}
        </div>
      </div>

      <style>{`
        .geo-wrapper {
          display: flex;
          width: 100%;
          height: 100vh;
          background-color: #fff;
        }

        .content-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 10px 20px;
        }

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
          height: 800px;             /* 🔼 Taller outer card */
          overflow: auto;            /* ✅ Internal scroll */
          border-radius: 8px;
          padding: 10px;
          background-color: white;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
        }

        .map-card iframe {
          width: 100%;
          height: 1000px;            /* ✅ Long scrollable iframe */
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
    </div>
  );
};
