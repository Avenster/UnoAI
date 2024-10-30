const express = require('express');
const cors = require('cors');
const app = express();

class Card {
    constructor(color, number, action = "") {
        this.color = color;
        this.number = number;
        this.action = action;
    }
}

class GameState {
    constructor() {
        this.deck = [];
        this.discardPile = [];
        this.aiHand = [];
        this.playerHand = [];
        this.topCard = null;
        this.isPlayerTurn = true;
        this.lastEffect = null;
        this.initializeDeck();
    }


    initializeDeck() {
        const colors = ["RED", "BLUE", "GREEN", "YELLOW"];
        const specialCards = ["skip", "reverse", "+2"];

        // Regular number cards (0-9)
        for (const color of colors) {
            for (let j = 0; j <= 9; j++) {
                this.deck.push(new Card(color, j));
                if (j !== 0) { // Add duplicate number cards except for 0
                    this.deck.push(new Card(color, j));
                }
            }
            
            // Special cards (two of each)
            for (const action of specialCards) {
                this.deck.push(new Card(color, 0, action));
                this.deck.push(new Card(color, 0, action));
            }
        }

        // Wild cards (4 of each)
        for (let i = 0; i < 4; i++) {
            this.deck.push(new Card("WILD", 0, "wild_card"));
            this.deck.push(new Card("WILD", 0, "+4"));
        }

        this.shuffleDeck();
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    reshuffleDeck() {
        if (this.discardPile.length === 0) return;
        
        const topCard = this.discardPile.pop();
        this.deck = [...this.discardPile];
        this.discardPile = [topCard];
        this.shuffleDeck();
    }

    drawCards(numCards, isPlayer = true) {
        const cards = [];
        for (let i = 0; i < numCards; i++) {
            if (this.deck.length === 0) {
                this.reshuffleDeck();
                if (this.deck.length === 0) break;
            }
            cards.push(this.deck.pop());
        }
        
        if (isPlayer) {
            this.playerHand.push(...cards);
        } else {
            this.aiHand.push(...cards);
        }
        
        return cards;
    }

    handleSpecialCard(card, selectedColor = null) {
        let skipTurn = false;
        this.lastEffect = null;

        switch (card.action) {
            case '+2':
                this.drawCards(2, !this.isPlayerTurn);
                this.lastEffect = "drew 2 cards";
                skipTurn = true;
                break;
            case '+4':
                this.drawCards(4, !this.isPlayerTurn);
                card.color = selectedColor;
                this.lastEffect = "drew 4 cards";
                skipTurn = true;
                break;
            case 'wild_card':
                card.color = selectedColor;
                break;
            case 'skip':
                skipTurn = true;
                this.lastEffect = "was skipped";
                break;
            case 'reverse':
                // In 2-player game, reverse acts like skip
                skipTurn = true;
                this.lastEffect = "was reversed";
                break;
        }

        return skipTurn;
    }

    isValidMove(cardIndex, selectedColor = null) {
        if (cardIndex >= this.playerHand.length) return false;
        
        const card = this.playerHand[cardIndex];
        
        // Wild cards are always valid with a selected color
        if (card.action === "wild_card" || card.action === "+4") {
            return selectedColor !== null;
        }
        
        // Check if card matches top card's color or number/action
        return (card.color === this.topCard.color ||
                (card.number === this.topCard.number) ||
                (card.action && card.action === this.topCard.action));
    }

    playCard(cardIndex, selectedColor = null) {
        if (!this.isValidMove(cardIndex, selectedColor)) {
            throw new Error("Invalid move");
        }
        
        const card = this.playerHand[cardIndex];
        this.playerHand.splice(cardIndex, 1);
        
        // Add current top card to discard pile
        if (this.topCard) {
            this.discardPile.push(this.topCard);
        }
        
        // Handle special card effects and get skip status
        const skipTurn = this.handleSpecialCard(card, selectedColor);
        this.topCard = card;
        
        // Switch turns unless turn was skipped
        if (!skipTurn) {
            this.isPlayerTurn = false;
        }
        
        // AI's turn if not skipped
        if (!this.isPlayerTurn) {
            this.playAITurn();
        }
        
        return this.getGameState();
    }

    
    findBestAICard() {
        // First prioritize action cards that match color
        let playableCards = this.aiHand.filter(card => 
            card.color === this.topCard.color && card.action
        );

        // Then try +4 or wild if we have them and no color match
        if (playableCards.length === 0) {
            playableCards = this.aiHand.filter(card => 
                card.action === "+4" || card.action === "wild_card"
            );
        }

        // Then try regular cards that match color
        if (playableCards.length === 0) {
            playableCards = this.aiHand.filter(card => 
                card.color === this.topCard.color
            );
        }

        // Then try to match number or action
        if (playableCards.length === 0) {
            playableCards = this.aiHand.filter(card => 
                (card.number === this.topCard.number) ||
                (card.action && card.action === this.topCard.action)
            );
        }

        if (playableCards.length === 0) return null;

        // Prioritize +4, +2, then other action cards
        const plus4Card = playableCards.find(card => card.action === "+4");
        if (plus4Card) return plus4Card;

        const plus2Card = playableCards.find(card => card.action === "+2");
        if (plus2Card) return plus2Card;

        const actionCard = playableCards.find(card => card.action);
        if (actionCard) return actionCard;

        // Otherwise play the highest number card
        return playableCards.reduce((highest, current) => 
            (current.number > highest.number) ? current : highest
        );
    }

    handleSpecialCard(card, selectedColor = null) {
        let skipTurn = false;
        this.lastEffect = null;

        switch (card.action) {
            case '+2':
                this.drawCards(2, !this.isPlayerTurn);
                this.lastEffect = `${!this.isPlayerTurn ? 'Player' : 'AI'} drew 2 cards`;
                skipTurn = true;
                break;
            case '+4':
                this.drawCards(4, !this.isPlayerTurn);
                card.color = selectedColor || this.getMostFrequentColor();
                this.lastEffect = `${!this.isPlayerTurn ? 'Player' : 'AI'} drew 4 cards`;
                skipTurn = true;
                break;
            case 'wild_card':
                card.color = selectedColor || this.getMostFrequentColor();
                this.lastEffect = `Color changed to ${card.color}`;
                break;
            case 'skip':
                skipTurn = true;
                this.lastEffect = `${!this.isPlayerTurn ? 'Player' : 'AI'} was skipped`;
                break;
            case 'reverse':
                skipTurn = true;
                this.lastEffect = `${!this.isPlayerTurn ? 'Player' : 'AI'} was skipped (reverse)`;
                break;
        }

        return skipTurn;
    }

    playAITurn() {
        const card = this.findBestAICard();
        
        if (card) {
            // Remove card from AI's hand
            const cardIndex = this.aiHand.indexOf(card);
            this.aiHand.splice(cardIndex, 1);
            
            // Add current top card to discard pile
            if (this.topCard) {
                this.discardPile.push(this.topCard);
            }
            
            // Handle special card effects
            const skipTurn = this.handleSpecialCard(card);
            this.topCard = card;
            
            // Switch turns unless turn was skipped
            if (!skipTurn) {
                this.isPlayerTurn = true;
            } else if (this.aiHand.length > 0) {
                // If turn was skipped but AI has cards, it gets another turn
                this.playAITurn();
                return;
            }
        } else {
            // AI must draw a card
            const drawnCards = this.drawCards(1, false);
            this.lastEffect = "AI drew a card";
            
            // Check if drawn card can be played
            if (drawnCards.length > 0) {
                const drawnCard = drawnCards[0];
                if (this.canPlayCard(drawnCard)) {
                    // Remove card from AI's hand
                    const cardIndex = this.aiHand.indexOf(drawnCard);
                    this.aiHand.splice(cardIndex, 1);
                    
                    // Add current top card to discard pile
                    if (this.topCard) {
                        this.discardPile.push(this.topCard);
                    }
                    
                    // Handle special card effects
                    const skipTurn = this.handleSpecialCard(drawnCard);
                    this.topCard = drawnCard;
                    
                    if (!skipTurn) {
                        this.isPlayerTurn = true;
                    } else if (this.aiHand.length > 0) {
                        this.playAITurn();
                        return;
                    }
                    return;
                }
            }
            this.isPlayerTurn = true;
        }
    }
    canPlayCard(card) {
        if (card.action === "wild_card" || card.action === "+4") {
            return true;
        }
        
        return (card.color === this.topCard.color ||
                card.number === this.topCard.number ||
                (card.action && card.action === this.topCard.action));
    }


    drawCard() {
        if (this.deck.length === 0) {
            this.reshuffleDeck();
        }
        
        if (this.deck.length > 0) {
            const drawnCard = this.deck.pop();
            this.playerHand.push(drawnCard);
            this.isPlayerTurn = false;
            this.playAITurn();
        }
        
        return this.getGameState();
    }

    initializeGame() {
        // Reset everything
        this.deck = [];
        this.discardPile = [];
        this.aiHand = [];
        this.playerHand = [];
        this.lastEffect = null;
        
        // Initialize and shuffle deck
        this.initializeDeck();
        
        // Deal initial cards
        for (let i = 0; i < 7; i++) {
            this.drawCards(1, true);
            this.drawCards(1, false);
        }
        
        // Set initial top card (re-draw if it's a wild card)
        do {
            this.topCard = this.deck.pop();
        } while (this.topCard.action === "wild_card" || this.topCard.action === "+4");
        
        this.isPlayerTurn = true;
        
        return this.getGameState();
    }

    getGameState() {
        return {
            aiHand: this.aiHand.length,
            playerHand: this.playerHand,
            topCard: this.topCard,
            isPlayerTurn: this.isPlayerTurn,
            deckCount: this.deck.length,
            lastEffect: this.lastEffect
        };
    }
}

// Express middleware
app.use(cors());
app.use(express.json());

const gameState = new GameState();

app.post('/api/start-game', (req, res) => {
    try {
        const state = gameState.initializeGame();
        res.json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/play-card', (req, res) => {
    try {
        const { cardIndex, selectedColor } = req.body;
        const response = gameState.playCard(cardIndex, selectedColor);
        res.json(response);
    } catch (error) {
        if (error.message === "Invalid move") {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

app.post('/api/draw-card', (req, res) => {
    try {
        const response = gameState.drawCard();
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});