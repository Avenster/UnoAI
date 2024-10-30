const API_BASE_URL = 'https://unoai-1.onrender.com/api';

export const gameApi = {
  startNewGame: async () => {
    const response = await fetch(`${API_BASE_URL}/start-game`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to start game');
    return response.json();
  },

  drawCard: async () => {
    const response = await fetch(`${API_BASE_URL}/draw-card`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to draw card');
    return response.json();
  },

  playCard: async (cardIndex, selectedColor) => {
    const response = await fetch(`${API_BASE_URL}/play-card`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardIndex, selectedColor })
    });
    if (!response.ok) throw new Error('Failed to play card');
    return response.json();
  }
};