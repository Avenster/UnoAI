#ifndef GAMESTATE_H
#define GAMESTATE_H

#include <nlohmann/json.hpp>
#include <vector>
#include <string>
#include <random>
#include <chrono>

using json = nlohmann::json;

// Card structure with JSON serialization
struct Card {
    std::string color;
    int number;
    std::string action;

    NLOHMANN_DEFINE_TYPE_INTRUSIVE(Card, color, number, action)
};

class GameState {
private:
    std::vector<Card> deck;
    std::vector<Card> aiHand;
    std::vector<Card> playerHand;
    Card topCard;
    bool isPlayerTurn;

    void initializeDeck() {
        std::vector<std::string> colors = {"Red", "Blue", "Green", "Yellow"};
        std::vector<std::string> special_cards = {"skip", "reverse", "+2"};
        
        // Regular number cards
        for (const auto& color : colors) {
            for (int j = 1; j <= 10; j++) {
                deck.push_back({color, j, ""});
            }
            // Special cards
            for (const auto& action : special_cards) {
                deck.push_back({color, 0, action});
            }
        }
        
        // Wild cards
        for (int i = 0; i < 4; i++) {
            deck.push_back({"", 0, "wild_card"});
            deck.push_back({"", 0, "+4"});
        }
        
        // Shuffle deck
        unsigned seed = std::chrono::system_clock::now().time_since_epoch().count();
        std::shuffle(deck.begin(), deck.end(), std::default_random_engine(seed));
    }

public:
    GameState() : isPlayerTurn(true) {
        initializeDeck();
    }
    
    void initializeGame() {
        // Clear hands
        aiHand.clear();
        playerHand.clear();
        
        // Deal initial cards
        for (int i = 0; i < 7; i++) {
            aiHand.push_back(deck.back());
            deck.pop_back();
            playerHand.push_back(deck.back());
            deck.pop_back();
        }
        
        // Set initial top card
        topCard = deck.back();
        deck.pop_back();
        
        isPlayerTurn = true;
    }
    
    json getGameState() const {
        json state;
        state["aiHand"] = aiHand.size();
        state["playerHand"] = playerHand;  
        state["topCard"] = topCard;
        state["isPlayerTurn"] = isPlayerTurn;
        return state;
    }
    
    bool isValidMove(size_t cardIndex) const {
        if (cardIndex >= playerHand.size()) return false;
        
        const Card& card = playerHand[cardIndex];
        
        // Wild cards are always valid
        if (card.action == "wild_card" || card.action == "+4") return true;
        
        // Check if card matches top card's color or number
        return (card.color == topCard.color ||
                (card.number != 0 && card.number == topCard.number) ||
                (!card.action.empty() && card.action == topCard.action));
    }
    
    json playCard(size_t cardIndex) {
        if (!isValidMove(cardIndex)) {
            throw std::runtime_error("Invalid move");
        }
        
        // Play the card
        topCard = playerHand[cardIndex];
        playerHand.erase(playerHand.begin() + cardIndex);
        
        isPlayerTurn = false;
        
        // AI's turn
        playAITurn();
        
        return getGameState();
    }
    
    void playAITurn() {
        // Simple AI implementation
        bool playedCard = false;
        
        for (size_t i = 0; i < aiHand.size(); i++) {
            const Card& card = aiHand[i];
            if (card.color == topCard.color ||
                (card.number != 0 && card.number == topCard.number) ||
                (!card.action.empty() && card.action == topCard.action) ||
                card.action == "wild_card" ||
                card.action == "+4") {
                
                topCard = card;
                aiHand.erase(aiHand.begin() + i);
                playedCard = true;
                break;
            }
        }
        
        if (!playedCard && !deck.empty()) {
            aiHand.push_back(deck.back());
            deck.pop_back();
        }
        
        isPlayerTurn = true;
    }
    
    json drawCard() {
        if (!deck.empty()) {
            playerHand.push_back(deck.back());
            deck.pop_back();
        }
        
        isPlayerTurn = false;
        playAITurn();
        
        return getGameState();
    }
};

#endif // GAMESTATE_H
