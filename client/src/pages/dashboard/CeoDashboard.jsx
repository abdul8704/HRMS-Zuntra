import React from 'react';
import { Sidebar } from "../../components/Sidebar";

export const CeoDashboard = () => {
  
  return (
    <div className="flex h-screen">
      <Sidebar role={"HR"} />
       <div className="flex-1 overflow-y-auto">
      <div className="grid grid-cols-10 grid-rows-10 bg-black/30 w-full h-screen gap-2">
        {/* Card 1 */}
        <div className="col-start-1 col-span-7 row-start-1 row-span-5 bg-[#BBD3CC]"></div>

        {/* Card 2 */}
        <div className="col-start-1 col-span-7 row-start-6 row-span-5 bg-[#8979FF]"></div>

        {/* Card 3 */}
        <div className="col-start-8 col-span-3 row-start-1 row-span-10 bg-[#08BDB1]"></div>
      </div>
    </div>
    </div>
  );
};


