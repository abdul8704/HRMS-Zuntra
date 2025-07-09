import React from 'react';

export const Loading = ({ useGif = false }) => {
  return (
    <div className="w-full h-full flex items-center justify-center z-50">
      {useGif ? (
        <div className='w-full h-full'>
          <div className="login-spinner mx-auto"></div>
        </div>
      ) : (
        <div className="text-gray-600 text-lg font-medium">
          <span className={`loading-text loading-text-pulse`}>
            {"Loading".split("").map((char, i) => (
              <span className="letter" key={i} style={{ "--delay": `${i * 0.1}s` }}>
                {char}
              </span>
            ))}
            <span className="dots ml-1 inline-block w-6 text-left">
              <span className="dot-1">.</span>
              <span className="dot-2">.</span>
              <span className="dot-3">.</span>
            </span>
          </span>
        </div>
      )}

      <style>{`

        .login-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: login-spin 1s linear infinite;
        }

        @keyframes login-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .loading-text {
          display: inline-block;
        }

        .loading-text-pulse .letter {
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

        .dots .dot-1,
        .dots .dot-2,
        .dots .dot-3 {
          display: inline-block;
          animation: dotPulse 1.5s infinite;
        }

        .dot-1 { animation-delay: 0s; }
        .dot-2 { animation-delay: 0.2s; }
        .dot-3 { animation-delay: 0.4s; }

        @keyframes dotPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};
