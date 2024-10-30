import React, { useState, useEffect } from 'react';
import { CardComponent } from './uno/CardComponent';
import { ColorSelector } from './uno/ColorSelector';
import { GameStats } from './uno/GameStats';
import { GameOverModal } from './uno/GameOverModal';
import { ErrorToast } from './uno/ErrorToast';
import { isCardPlayable } from '../utils/gameUtils';
import { gameApi } from './gameApi';
import '../css/uno.css';

const UnoGame = () => {
  const [gameState, setGameState] = useState({
    aiHand: 0,
    playerHand: [],
    topCard: null,
    isPlayerTurn: true,
    gameOver: false,
    winner: null,
    gameStats: {
      playerCardsPlayed: 0,
      aiCardsPlayed: 0,
      turnsPlayed: 0,
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pendingCardIndex, setPendingCardIndex] = useState(null);
  const [cardPlayAnimation, setCardPlayAnimation] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const startNewGame = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await gameApi.startNewGame();
      setGameState({
        ...data,
        gameOver: false,
        winner: null,
        gameStats: {
          playerCardsPlayed: 0,
          aiCardsPlayed: 0,
          turnsPlayed: 0,
        }
      });
    } catch (err) {
      setError('Error starting game: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawCard = async () => {
    if (!gameState.isPlayerTurn || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await gameApi.drawCard();
      setGameState(prev => ({
        ...prev,
        ...data
      }));
    } catch (err) {
      setError('Failed to draw card. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardPlay = async (cardIndex, selectedColor = null) => {
    if (!gameState.isPlayerTurn || isLoading) return;
    
    const card = gameState.playerHand[cardIndex];
    if (!isCardPlayable(card, gameState.topCard)) {
      setError("This card cannot be played right now!");
      return;
    }

    if ((card.action === 'wild_card' || card.action === '+4') && !selectedColor) {
      setShowColorPicker(true);
      setPendingCardIndex(cardIndex);
      return;
    }
    
    setIsLoading(true);
    setError(null);

    setCardPlayAnimation({
      fromIndex: cardIndex,
      isPlayer: true
    });

    try {
      const data = await gameApi.playCard(cardIndex, selectedColor);
      
      setTimeout(() => {
        setCardPlayAnimation(null);
        setGameState(prev => ({
          ...prev,
          ...data,
          gameOver: data.playerHand.length === 0 || data.aiHand === 0,
          winner: data.playerHand.length === 0 ? 'player' : data.aiHand === 0 ? 'ai' : null
        }));
      }, 500);

    } catch (err) {
      setError('Failed to play card. Please try again.');
      setCardPlayAnimation(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleColorSelect = (color) => {
    setShowColorPicker(false);
    if (pendingCardIndex !== null) {
      handleCardPlay(pendingCardIndex, color);
      setPendingCardIndex(null);
    }
  };

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className="uno-main">
      <div className="m2 mx-auto">
        {/* New Game Button */}
        

        {/* Game Stats */}
        <GameStats 
          aiHand={gameState.aiHand}
          playerHandLength={gameState.playerHand.length}
          isPlayerTurn={gameState.isPlayerTurn}
        />

        {/* Error Toast */}
        <ErrorToast 
          error={error}
          onClose={() => setError(null)}
        />

        {/* AI's Hand */}
        <div className="relative h-24">
          <h2 className="text-white text-xl">AI's Hand</h2>
          <div className="flex justify-center gap-2">
            {Array(gameState.aiHand).fill(null).map((_, index) => (
              <CardComponent
                key={index}
                faceDown={true}
                style={{
                  transform: cardPlayAnimation?.isPlayer === false && cardPlayAnimation?.fromIndex === index
                    ? 'scale(0.8) translateY(100px)'
                    : 'scale(0.8)',
                  transition: 'transform 0.5s ease-in-out'
                }}
              />
            ))}
          </div>
        </div>

        {/* Game Table */}
        <div className="table relative bg-gray-800/90 rounded-3xl border-4 border-gray-700">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 rounded-3xl" />
          
          <div className="relative h-full flex items-center justify-center gap-16">
            {/* Draw Pile */}
            <div className="cursor-pointer hover:scale-105 transition-transform">
              <div className="relative">
                <CardComponent
                  faceDown={true}
                  onClick={handleDrawCard}
                />
                <div className="absolute -top-2 -right-2 bg-white text-black text-xs px-2 py-1 rounded-full">
                  Draw
                </div>
              </div>
            </div>
            
            {/* Current Card */}
            {gameState.topCard && (
              <CardComponent
                card={gameState.topCard}
                isPlayable={false}
              />
            )}
          </div>
        </div>

        {/* Player's Hand */}
        <div className="rola relative">
          <h2 className="text-xl text-white">Your Hand</h2>
          <div className="flex justify-center gap-2">
            {gameState.playerHand.map((card, index) => {
              const isValid = isCardPlayable(card, gameState.topCard);
              
              return (
                <div
                  key={index}
                  className={`transition-all duration-200 ${
                    !isValid && gameState.isPlayerTurn ? 'hover:shake' : ''
                  }`}
                  style={{
                    transform: cardPlayAnimation?.isPlayer && cardPlayAnimation?.fromIndex === index
                      ? 'translateY(-100px)'
                      : '',
                    transition: 'transform 0.5s ease-in-out'
                  }}
                >
                  <CardComponent
                    card={card}
                    isPlayable={gameState.isPlayerTurn}
                    onClick={() => handleCardPlay(index)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Color Selector Modal */}
        <ColorSelector 
          isOpen={showColorPicker} 
          onSelect={handleColorSelect} 
        />

        {/* Game Over Modal */}
        {gameState.gameOver && (
          <GameOverModal
            winner={gameState.winner}
            onPlayAgain={startNewGame}
          />
        )}
        
      </div>
      <div className="btn">
          <button 
            onClick={startNewGame}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            New Game
          </button>
    </div>
    </div>
  );
};

export default UnoGame;