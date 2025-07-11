import React from 'react';

export const DescriptionSection = ({ description }) => {
  if (!description) return null;

  return (
    <div className="my-6 px-4">
      <h4 className="flex items-center text-xl font-semibold text-black mb-3">
        <span className="w-1 h-5 bg-teal-600 mr-2" />
        Description
      </h4>
      <p className="text-sm leading-7 text-gray-800">{description}</p>
    </div>
  );
};

