import React from 'react';
import "../../css/uno.css"

export const GameStats = ({ aiHand, playerHandLength, isPlayerTurn }) => {
  return (
    <div className="m3 rounded-xl">
      <div className="sub-main text-white">
        <div>
          <h3 className="font-bold">AI</h3>
          <p>Cards: {aiHand}</p>
          <p>Status: {!isPlayerTurn ? "Playing..." : "Waiting"}</p>
        </div>
        <div>
          <h3 className="font-bold">You</h3>
          <p>Cards: {playerHandLength}</p>
          <p>Status: {isPlayerTurn ? "Your Turn" : "Waiting"}</p>
        </div>
      </div>
    </div>
  );
};
