import random
import numpy as np

COLORS = ['red', 'green', 'blue', 'yellow']
NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
DECK = [(color, number) for color in COLORS for number in NUMBERS]

q_table = np.zeros((len(DECK), 2 * len(DECK)), dtype=float)

def initialize_deck():
    deck = DECK.copy()
    random.shuffle(deck)
    return deck

def draw_cards(deck, num_cards):
    cards = deck[:num_cards]
    deck = deck[num_cards:]
    return deck, cards

def is_valid(card, top_card):
    return card[0] == top_card[0] or card[1] == top_card[1]

def update_q_table(q_table, state, action, reward, next_state):
    alpha = 0.1  
    gamma = 0.9  

    current_value = q_table[state, action]
    max_future_value = np.max(q_table[next_state, :])
    new_value = (1 - alpha) * current_value + alpha * (reward + gamma * max_future_value)

    q_table[state, action] = new_value

def play_episode():
    deck = initialize_deck()
    player_1_hand, deck = draw_cards(deck, 7)
    player_2_hand, deck = draw_cards(deck, 7)

    top_card, deck = draw_cards(deck, 1)

    state = DECK.index(player_1_hand[0])

    for _ in range(100): 
        action = np.argmax(q_table[state, :])
        card = player_1_hand.pop(action % len(player_1_hand))
        if is_valid(card, top_card[0]):
            reward = 1
            top_card = card
        else:
            reward = -1

        next_state = DECK.index(player_1_hand[0])
        update_q_table(q_table, state, action, reward, next_state)

        if not player_2_hand:
            break  
        card = random.choice(player_2_hand)
        if is_valid(card, top_card[0]):
            reward = 1
            top_card = card
        else:
            reward = -1
        state = DECK.index(card)
        next_state = DECK.index(player_1_hand[0])
        update_q_table(q_table, state, 0, reward, next_state)

    return

for _ in range(1000):
    play_episode()

print(q_table)
