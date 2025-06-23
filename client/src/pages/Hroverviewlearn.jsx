import React from "react";
import { Sidebar } from "../components/Sidebar";
import { CourseVideoPlayer } from "../components/upskill/Hroverviewlearning";
import { IntroductionCard } from "../components/upskill/introtocourse";
import { TableOfContents } from "../components/upskill/TableContents";

export const HrOverviewLearning = () => {
    return ( 
        <div>
        <div className="flex min-h-screen">
            {/* Sidebar on the left */}
            <div className="sidebar"><Sidebar />
            <div className="videoplayer"><CourseVideoPlayer /></div>
            <div className="introtocourse"><IntroductionCard /></div>
            <div className="TableOfContents"><TableOfContents /></div>

            </div>
        </div>
        <style>{`
        .sidebar{
        display: flex;}
        .videoplayer{
        flex: 1;
        }
        `}</style>
        
        </div>
    );
}