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
    relative w-24 h-36 rounded-xl border-2 border-white/20 
    transform transition-all duration-200 shadow-lg
    ${isPlayable ? 'cursor-pointer hover:scale-110 hover:-translate-y-4' : 'opacity-90'}
  `;

  if (faceDown) {
    return (
      <div 
        className={`${baseStyles} bg-gradient-to-br from-purple-600 to-purple-800`}
        style={style}
        onClick={onClick}
      >
        <div className="absolute inset-2 rounded-lg border border-white/30 flex items-center justify-center">
          <div className="text-white text-4xl font-bold rotate-45 opacity-30">UNO</div>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 to-white/30 opacity-50" />
      </div>
    );
  }

  return (
    <div 
      className={`${baseStyles} ${cardColors[card.color]}`}
      onClick={isPlayable ? onClick : undefined}
      style={style}
    >
      <div className="absolute inset-2 rounded-lg border border-white/30 flex flex-col items-center justify-between p-2">
        <div className="text-white text-2xl font-bold">
          {card.action || card.number}
        </div>
        
        <div className="text-white text-4xl font-bold rotate-45 opacity-30">UNO</div>
        
        <div className="text-white text-2xl font-bold rotate-180">
          {card.action || card.number}
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 to-white/30 opacity-50" />
    </div>
  );
};