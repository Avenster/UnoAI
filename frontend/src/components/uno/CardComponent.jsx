import React from 'react';

const cardColors = {
  RED: 'bg-gradient-to-br from-red-500 to-red-700',
  BLUE: 'bg-gradient-to-br from-blue-500 to-blue-700',
  GREEN: 'bg-gradient-to-br from-green-500 to-green-700',
  YELLOW: 'bg-gradient-to-br from-yellow-500 to-yellow-700',
  WILD: 'bg-gradient-to-br from-purple-500 to-purple-700'
};

export const CardComponent = ({ card, isPlayable, onClick, style, faceDown }) => {
  const baseStyles = `
    relative w-36 h-56 rounded-3xl border-4 border-white/20 
    transform transition-all duration-200 shadow-xl
    ${isPlayable ? 'cursor-pointer hover:scale-105 hover:-translate-y-3' : 'opacity-90'}
  `;

  const fontStyle = {
    fontSize: '2.7vmin'
  };

  if (faceDown) {
    return (
      <div 
        className={`${baseStyles} bg-gradient-to-br from-purple-600 to-purple-800`}
        style={style}
        onClick={onClick}
      >
        <div className="absolute inset-4 rounded-lg border border-white/20 flex items-center justify-center">
          <div style={fontStyle} className="text-white font-bold rotate-45 opacity-30">UNO</div>
        </div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/0 to-white/30 opacity-50" />
      </div>
    );
  }

  return (
    <div 
      className={`${baseStyles} ${cardColors[card.color]}`}
      onClick={isPlayable ? onClick : undefined}
      style={style}
    >
      <div className="absolute inset-4 rounded-lg border border-white/20 flex flex-col items-center justify-between p-6">
        <div style={fontStyle} className="text-white font-bold">
          {card.action || card.number}
        </div>
        
        <div style={fontStyle} className="text-white font-bold rotate-45 opacity-30">UNO</div>
        
        <div style={fontStyle} className="text-white font-bold rotate-180">
          {card.action || card.number}
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/0 to-white/20 opacity-50" />
    </div>
  );
};
