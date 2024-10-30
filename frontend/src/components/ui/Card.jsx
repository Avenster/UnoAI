import React from 'react';
import { CARD_COLORS } from '../../constants/gameConstants';

export const CardComponent = ({ card, isPlayable, onClick, style, isAnimating }) => {
  const baseStyles = `
    relative w-24 h-36 rounded-xl border-2 border-white/20 
    transform transition-all duration-300 shadow-xl
    ${isPlayable ? 'cursor-pointer hover:scale-110 hover:-translate-y-2' : 'opacity-90'}
    ${isAnimating ? 'animate-drawCard' : ''}
  `;

  const color = card.action === 'wild_card' || card.action === '+4' ? 'WILD' : card.color;

  return (
    <div 
      className={`${baseStyles} ${CARD_COLORS[color]}`}
      onClick={isPlayable ? onClick : undefined}
      style={{
        ...style,
        boxShadow: '0 0 15px rgba(255,255,255,0.2)'
      }}
    >
      <div className="absolute inset-2 rounded-lg border border-white/50 flex flex-col items-center justify-between p-2 bg-white/10">
        <div className="text-white text-xl font-bold">
          {card.action ? card.action.toUpperCase() : card.number}
        </div>
        
        <div className="text-white text-3xl font-bold">
          {card.action ? (
            card.action === '+4' ? '+4' : 
            card.action === '+2' ? '+2' :
            card.action === 'wild_card' ? '🌈' :
            card.action === 'skip' ? '⊘' :
            card.action === 'reverse' ? '⟲' : ''
          ) : (
            <span className="text-5xl opacity-80">{card.number}</span>
          )}
        </div>
        
        <div className="text-white text-xl font-bold rotate-180">
          {card.action ? card.action.toUpperCase() : card.number}
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/30 to-white/10" />
    </div>
  );
};