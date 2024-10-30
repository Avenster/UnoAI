# UNO Game

A full-stack implementation of the classic UNO card game, featuring a React frontend and Node.js/Express backend. Play against an AI opponent in this modern web-based version of UNO.

Repository: [https://github.com/Avenster/UnoAI](https://github.com/Avenster/UnoAI)

## Features

- 🎮 Complete UNO gameplay implementation
- 🤖 Smart AI opponent with strategic card playing
- 🎨 Interactive card animations and color picker
- ⚡ Real-time game state management
- 🎯 Support for all standard UNO cards and actions:
  - Number cards (0-9)
  - Action cards (Skip, Reverse, +2)
  - Wild cards (Color change, +4)
- 📊 Game statistics tracking
- 🎉 Win/lose conditions and game over states

## Technologies Used

### Frontend
- React
- CSS3 with Tailwind CSS
- Modern JavaScript (ES6+)
- Vite

### Backend
- Node.js
- Express
- CORS for cross-origin resource sharing

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Avenster/UnoAI.git
cd UnoAI
```

2. Set up the backend:
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install
```

3. Set up the frontend:
```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install
```

## Running the Application

1. Start the backend server:
```bash
# Make sure you're in the backend directory
cd backend
npm start
```
The server will run on `http://localhost:3001`

2. Start the frontend development server:
```bash
# Make sure you're in the frontend directory
cd frontend
npm run dev
```
The application will open in your browser (Vite's default port)

## Project Structure

```
UnoAI/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── uno/
│   │   ├── utils/
│   │   ├── css/
│   │   └── App.jsx
│   └── package.json
└── backend/
    ├── server.js
    └── package.json
```

## Game Rules

- The game follows standard UNO rules
- Players must match the top card by either color or number/action
- Special cards:
  - Skip: Next player loses their turn
  - Reverse: Acts as a skip in 2-player game
  - +2: Next player draws 2 cards and loses their turn
  - Wild: Change the current color
  - Wild +4: Next player draws 4 cards, lose their turn, and you change the color

## API Endpoints

### POST /api/start-game
- Initializes a new game
- Returns initial game state

### POST /api/play-card
- Plays a card from the player's hand
- Parameters:
  - `cardIndex`: Index of the card in player's hand
  - `selectedColor`: Required for wild cards

### POST /api/draw-card
- Draws a card from the deck
- Automatically ends player's turn

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Inspired by the classic UNO card game by Mattel
- Built with modern web technologies and best practices
- Special thanks to the open-source community