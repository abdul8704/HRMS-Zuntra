import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import zuntraLogo from "../../assets/zuntra.png";

export const NewUser = () => {
  const hasAccess = false;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="relative w-full h-full">
      {/* ABSOLUTE LOGO - NOT BLURRED */}
      <div className="absolute top-4 left-4 z-[1001]">
        <img className="w-40 h-auto object-contain ml-6" src={zuntraLogo} alt="ZUNTRA" />
      </div>

      <div className="flex flex-row min-h-screen flex-wrap md:flex-nowrap">
        {/* BLURRED SIDEBAR */}
        <div className={`w-64 bg-[#aabfb9] pt-24 px-4 flex flex-col gap-4 
                        ${!hasAccess ? 'blur-sm pointer-events-none select-none' : ''} 
                        md:w-64 w-full md:flex-col flex-row overflow-x-auto`}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-12 bg-[#d3d3d3] rounded-md flex-shrink-0 w-full md:w-auto" />
          ))}
        </div>

        {/* Main content (blur if !hasAccess) */}
        <div className={`flex-grow p-8 ${!hasAccess ? 'blur-sm pointer-events-none select-none' : ''} md:p-8 p-4`}>
          <div className="w-full h-full">
            <div
              className="grid w-full h-full gap-4
                         grid-cols-8 grid-rows-9
                         md:grid-cols-8 md:grid-rows-9
                         sm:grid-cols-2 sm:grid-rows-auto"
            >
              <div className="p-4 rounded-[20px] bg-[rgba(144,144,144,0.42)] col-start-1 col-end-5 row-start-1 row-end-2" />
              <div className="p-4 rounded-[20px] bg-[#C1E8BD] col-start-1 col-end-3 row-start-2 row-end-3" />
              <div className="p-4 rounded-[20px] bg-[#E1BEC5] col-start-1 col-end-3 row-start-3 row-end-4" />
              <div className="p-4 rounded-[20px] bg-[#C3E4EE] col-start-3 col-end-5 row-start-2 row-end-3" />
              <div className="p-4 rounded-[20px] bg-[#DECEB9] col-start-3 col-end-5 row-start-3 row-end-4" />
              <div className="p-4 rounded-[20px] bg-[#BFBFF7] col-start-1 col-end-5 row-start-4 row-end-7" />
              <div className="p-4 rounded-[20px] bg-[#DDB3DD] col-start-1 col-end-4 row-start-7 row-end-10" />
              <div className="p-4 rounded-[20px] bg-[#F2C3B9] col-start-5 col-end-9 row-start-1 row-end-5" />
              <div className="p-4 rounded-[20px] bg-[#F6E0BF] col-start-5 col-end-9 row-start-5 row-end-7" />
              <div className="p-4 rounded-[20px] bg-[#ADC0DA] col-start-4 col-end-9 row-start-7 row-end-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay if no access */}
      {!hasAccess && (
        <div className="absolute top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2 text-center p-8 rounded-xl bg-transparent">
          <h1 className="text-[2.4rem] font-bold text-[#111011] mb-4">You’re in! Well… almost.</h1>
          <h2 className="text-[1.4rem] font-medium text-[#616161] leading-relaxed">
            Please wait until HR grants access. HR is still deciding whether to open the door or pretend they’re not home.
          </h2>
        </div>
      )}
    </div>
  );
};
