import React, { useState } from 'react';
import HomePage from './HomePage';
import UnoGame from './components/UnoGame';
import './css/App.css';

function App() {
  const [showGame, setShowGame] = useState(false);

  return (
    <div className="app">
      {showGame ? (
        <UnoGame onBackToHome={() => setShowGame(false)} />
      ) : (
        <HomePage onStartGame={() => setShowGame(true)} />
      )}
    </div>
  );
}

export default App;