import React from 'react';
import { Mail, Phone, Search, Crown } from 'lucide-react';

const team = [
  {
    name: 'Jai Atithya A',
    email: 'jaiatithya@zuntra.com',
    phone: '+91 1234567890',
    role: 'Embedded & Iot Developer',
    color: 'bg-[#B3E5DC]',
    image: 'https://i.imgur.com/YOUR_IMAGE_URL.jpg',
    lead: true,
  },
  {
    name: 'Jai Atithya A',
    email: 'jaiatithya@zuntra.com',
    phone: '+91 1234567890',
    role: 'Mern Stack Developer',
    color: 'bg-[#F1D5A7]',
    image: 'https://i.imgur.com/YOUR_IMAGE_URL.jpg',
    lead: false,
  },
  {
    name: 'Jai Atithya A',
    email: 'jaiatithya@zuntra.com',
    phone: '+91 1234567890',
    role: 'Java Full Stack Developer',
    color: 'bg-[#F5B7B1]',
    image: 'https://i.imgur.com/YOUR_IMAGE_URL.jpg',
    lead: false,
  },
  {
    name: 'Jai Atithya A',
    email: 'jaiatithya@zuntra.com',
    phone: '+91 1234567890',
    role: 'Ui / UX Designer',
    color: 'bg-[#CDB4DB]',
    image: 'https://i.imgur.com/YOUR_IMAGE_URL.jpg',
    lead: false,
  },
];

const TeamDetails = () => {
  return (
    <div className="w-full h-full bg-[#ADC0DA] rounded-xl p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-black">Team Details</h2>
        <Search className="text-black w-5 h-5" />
      </div>

      {/* Members */}
      <div className="overflow-y-auto pr-2 flex flex-col gap-3">
        {team.map((member, index) => (
          <div key={index} className="bg-[#C7D9EA] rounded-lg p-3 flex items-center gap-4">
            {/* Image */}
            <img
              src={member.image}
              alt={member.name}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-black text-sm">{member.name}</p>
                {member.lead && <Crown size={16} className="text-black" />}
              </div>
              <p className="text-xs text-gray-700 flex items-center gap-1">
                <Mail size={12} /> {member.email}
              </p>
              <p className="text-xs text-gray-700 flex items-center gap-1">
                <Phone size={12} /> {member.phone}
              </p>
              <span className={`text-xs mt-1 px-3 py-[2px] rounded-full inline-block text-black font-medium ${member.color}`}>
                {member.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;
