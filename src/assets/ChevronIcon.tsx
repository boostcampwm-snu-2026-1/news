import React from 'react';

interface ChevronIconProps {
  direction: 'left' | 'right';
  color?: string;
}

const ChevronIcon: React.FC<ChevronIconProps> = ({ direction, color = 'currentColor' }) => {
  const d = direction === 'left' ? 'M15 18L9 12L15 6' : 'M9 18L15 12L9 6';
  
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={d} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default ChevronIcon;