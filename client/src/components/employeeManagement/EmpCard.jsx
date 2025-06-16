import React from 'react';
import { Mail, Phone, CheckCircle, XCircle } from 'lucide-react';

export const EmpCard = ({ name, email, phone, date, image, bgColor }) => {
  return (
    <div className={`rounded-xl p-4 flex items-start gap-4 shadow-md ${bgColor} w-full`}>
      <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover" />
      <div className="flex-1">
        <h2 className="font-semibold text-lg">{name}</h2>
        <p className="flex items-center text-sm text-gray-700 mt-1">
          <Mail size={14} className="mr-1" /> {email}
        </p>
        <p className="flex items-center text-sm text-gray-700">
          <Phone size={14} className="mr-1" /> {phone}
        </p>
        <div className="text-sm mt-1 bg-white/50 px-2 py-0.5 rounded-md w-fit text-gray-800">{date}</div>
      </div>
      <div className="flex flex-col gap-2 mt-1">
        <CheckCircle size={24} className="text-green-500 cursor-pointer" />
        <XCircle size={24} className="text-red-500 cursor-pointer" />
      </div>
    </div>
  );
};
