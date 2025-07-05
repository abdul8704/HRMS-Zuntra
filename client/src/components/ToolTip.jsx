import React, { useEffect, useState } from 'react';

export const ToolTip = ({ text, anchorRef, position = 'top', offset }) => {
  const [style, setStyle] = useState({ top: 0, left: 0, visible: false });

  useEffect(() => {
    if (!anchorRef?.current) return;

    const rect = anchorRef.current.getBoundingClientRect();
    const top =
      position === 'top' ? rect.top - offset : rect.bottom + offset;
    const left = rect.left;

    setStyle({ top, left, visible: true });
  }, [anchorRef, position, offset, text]);

  if (!style.visible) return null;

  return (
    <div
      className="fixed bg-gray-800 text-white px-4 py-2 rounded-md text-sm whitespace-nowrap z-[1000] pointer-events-none"
      style={{ top: `${style.top}px`, left: `${style.left}px` }}
    >
      {text}
    </div>
  );
};
