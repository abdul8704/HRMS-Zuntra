import React from 'react';

export const Loading = ({ useGif = false }) => {
  return (
    <div className="w-full h-full flex items-center justify-center z-50">
      {useGif ? (
        <img src={require('../assets/loader.gif')} alt="Loading..." className="w-full h-full object-contain" />
      ) : (
        <div className="text-gray-600 text-lg font-medium">
          <span className="loading-text">
            <span className="letter" style={{'--delay': '0s'}}>L</span>
            <span className="letter" style={{'--delay': '0.1s'}}>o</span>
            <span className="letter" style={{'--delay': '0.2s'}}>a</span>
            <span className="letter" style={{'--delay': '0.3s'}}>d</span>
            <span className="letter" style={{'--delay': '0.4s'}}>i</span>
            <span className="letter" style={{'--delay': '0.5s'}}>n</span>
            <span className="letter" style={{'--delay': '0.6s'}}>g</span>
            <span className="dots ml-1 inline-block w-6 text-left">
              <span className="dot-1">.</span>
              <span className="dot-2">.</span>
              <span className="dot-3">.</span>
            </span>
          </span>
        </div>
      )}

      {/* Keyframe animation for dots */}
      <style>{`
        .loading-text {
          display: inline-block;
        }

        .loading-text .letter {
          display: inline-block;
          animation: letterPulse 2s infinite;
          animation-delay: var(--delay);
        }

        @keyframes letterPulse {
          0%, 50%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          25% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        .dots {
          display: inline-block;
          width: 24px;
          text-align: left;
        }

        .dots .dot-1,
        .dots .dot-2,
        .dots .dot-3 {
          opacity: 0;
          animation: dotFade 1.5s infinite;
        }

        .dots .dot-1 {
          animation-delay: 0.7s;
        }

        .dots .dot-2 {
          animation-delay: 1s;
        }

        .dots .dot-3 {
          animation-delay: 1.3s;
        }

        @keyframes dotFade {
          0%, 20% {
            opacity: 0;
          }
          40%, 80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        /* Alternative wave animation for the whole text */
        .loading-text-wave .letter {
          display: inline-block;
          animation: letterWave 2s infinite;
          animation-delay: var(--delay);
        }

        @keyframes letterWave {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        /* Alternative glow animation for the whole text */
        .loading-text-glow .letter {
          display: inline-block;
          animation: letterGlow 2s infinite;
          animation-delay: var(--delay);
        }

        @keyframes letterGlow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(107, 114, 128, 0.3);
            color: #6b7280;
          }
          50% {
            text-shadow: 0 0 15px rgba(107, 114, 128, 0.8);
            color: #374151;
          }
        }
      `}</style>
    </div>
  );
};