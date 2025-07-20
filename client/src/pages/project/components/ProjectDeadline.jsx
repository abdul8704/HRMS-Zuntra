import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Loading } from "../../utils/Loading";

export const ProjectDeadline = () => {
  const [projectDate, setProjectDate] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  const formatDateDDMMYYYY = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}${month}${year}`;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const formatted = formatDateDDMMYYYY(projectDate);
        const res = await api.get(`/api/project/all/date/${formatted}`);
        if (res.data.success) {
          setProjects(Array.isArray(res.data.data) ? res.data.data : []);
        }
      } catch (err) {
        setProjects([]);
        setApiMessage(err?.response?.data?.message || 'No projects for this date.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projectDate]);

  const selectedDate = projectDate.toISOString().split('T')[0];



  return (
    <div className="w-full h-full rounded-2xl flex flex-col text-[clamp(0.7rem,1.2vw,1rem)] p-[clamp(0.5rem,1vw,1rem)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-[0.5rem]">
        <h2 className="font-semibold text-gray-800 text-[clamp(0.9rem,1.5vw,0.3rem)]">Project Deadline</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            if (!isNaN(newDate)) setProjectDate(newDate);
          }}
          className="bg-[rgba(252,224,255,0.5)] px-[clamp(0.5rem,1vw,1rem)] py-[0.3rem] rounded-md border border-gray-300 text-[clamp(0.7rem,1vw,0.3rem)] h-[1.5rem]"
        />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-2 gap-3 font-semibold mb-[clamp(0.5rem,1vw,1rem)]">
        <span className="bg-[rgba(252,224,255,0.5)] py-[0.3rem] px-[0.5rem] rounded-md text-center text-[clamp(0.75rem,1.2vw,0.3rem)]">Project Name</span>
        <span className="bg-[rgba(252,224,255,0.5)] py-[0.3rem] px-[0.5rem] rounded-md text-center text-[clamp(0.75rem,1.2vw,0.3rem)]">Team</span>
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-center italic text-gray-600 py-4"><Loading useGif={true}/></div>
        ) : projects.length === 0 ? (
          <div className="text-center italic text-gray-600 py-4">
            {apiMessage || 'No projects for this date.'}
          </div>
        ) : (
          projects.map((project, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-3 mb-2 text-gray-700 text-[clamp(0.7rem,1.1vw,0.9rem)]"
            >
              <span className="px-2">{project.projectTitle}</span>
              <span className="px-2">{project.teamName}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
