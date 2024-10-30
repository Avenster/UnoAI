import React from 'react';

export const ColorSelector = ({ onSelect, isOpen }) => {
  if (!isOpen) return null;
  
  const colors = ['RED', 'BLUE', 'GREEN', 'YELLOW'];
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-white text-xl mb-4">Select a color</h3>
        <div className="grid grid-cols-2 gap-4">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => onSelect(color)}
              className={`w-24 h-24 rounded-lg transition-transform hover:scale-105
                ${color === 'RED' ? 'bg-red-500' : ''}
                ${color === 'BLUE' ? 'bg-blue-500' : ''}
                ${color === 'GREEN' ? 'bg-green-500' : ''}
                ${color === 'YELLOW' ? 'bg-yellow-500' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};