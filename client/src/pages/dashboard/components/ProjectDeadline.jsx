import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Loading } from "../../utils/Loading";

export const ProjectDeadline = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/project/deadlines`);
        if (res.data.success) {
          setProjects(Array.isArray(res.data.data) ? res.data.data : []);
        }
      } catch (err) {
        setProjects([]);
        setApiMessage(err?.response?.data?.message || 'No project deadlines found.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="w-full h-full rounded-2xl flex flex-col text-[clamp(0.7rem,1.2vw,1rem)] p-[clamp(0.5rem,1vw,1rem)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-[0.5rem]">
        <h2 className="font-semibold text-gray-800 text-[clamp(0.9rem,1.5vw,0.3rem)]">Project Deadlines</h2>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-2 gap-3 font-semibold mb-[clamp(0.5rem,1vw,1rem)]">
        <span className="bg-[rgba(252,224,255,0.5)] py-[0.3rem] px-[0.5rem] rounded-md text-center text-[clamp(0.75rem,1.2vw,0.3rem)]">Project</span>
        <span className="bg-[rgba(252,224,255,0.5)] py-[0.3rem] px-[0.5rem] rounded-md text-center text-[clamp(0.75rem,1.2vw,0.3rem)]">Deadline</span>
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-center italic text-gray-600 py-4"><Loading useGif={true}/></div>
        ) : projects.length === 0 ? (
          <div className="text-center italic text-gray-600 py-4">
            {apiMessage || 'No deadlines found.'}
          </div>
        ) : (
          projects.map((project, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-3 mb-2 text-gray-700 text-[clamp(0.7rem,1.1vw,0.9rem)]"
            >
              <span className="px-2">{project.project}</span>
              <span className="px-2">{project.deadline}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
