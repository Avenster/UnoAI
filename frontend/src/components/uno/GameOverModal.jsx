import React from 'react';

export const GameOverModal = ({ winner, onPlayAgain }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-xl border border-white/20 max-w-sm w-full mx-4">
        <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
        <p className="text-gray-300 mb-6">
          {winner === 'player' ? 'Congratulations! You won!' : 'AI wins! Better luck next time!'}
        </p>
        <button 
          onClick={onPlayAgain}
          className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};