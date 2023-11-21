import random
import copy
import numpy as np

colors = ['red', 'blue', 'green', 'yellow']
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
deck = [f"{color} {number}" for color in colors for number in numbers]
random.shuffle(deck)
deck_copy = copy.copy(deck)

def draw_card(deck):
    global deck_copy
    card = deck_copy.pop()
    return deck, card

def is_valid(card, top_card):
    return card.split()[0] == top_card.split()[0] or card.split()[1] == top_card.split()[1]

def update_q_table(q_table, state, action, reward, next_state):
    alpha = 0.1  
    gamma = 0.9  

    current_value = q_table[state, action]
    max_future_value = np.max(q_table[next_state, :])
    new_value = (1 - alpha) * current_value + alpha * (reward + gamma * max_future_value)

    q_table[state, action] = new_value

def play_game(deck):
    top_card = deck.pop(random.randint(0, len(deck) - 1))
    player_hand = random.sample(deck, 5)
    agent_hand = random.sample(deck, 5)
    global deck_copy

    turn = 'user'

    while True:
        print("\n" + "=" * 30)
        print(f"Top Card: {top_card}")
        print("User Hand:", player_hand)
        print("Agent Hand:", agent_hand)

        if turn == 'user':
            user_action = input("Your turn! Enter the card you want to play "
                                ", or type 'draw' to draw a card: ")

            if user_action.lower() == 'draw':
                if not deck:
                    print("Deck is empty. Skipping turn.")
                else:
                    drawn_card = deck_copy.pop()
                    print(f"User draws: {drawn_card}")
                    player_hand.append(drawn_card)
            else:
                user_input = user_action.split()
                if len(user_input) == 2:
                    color, value = user_input
                    card = f"{color} {value}"
                else:
                    print("Invalid input. Try again.")
                    continue

                if is_valid(card, top_card):
                    print(f"User plays: {card}")
                    top_card = card
                    player_hand.remove(card)
                    if not player_hand:
                        print("Congratulations! You won!")
                        break
                else:
                    print("Invalid move. Try again.")

            turn = 'agent'
        else:
            valid_cards = [card for card in agent_hand if is_valid(card, top_card)]

            if valid_cards:
                agent_action = np.argmax(q_table[deck.index(valid_cards[0]), :])
                agent_card = valid_cards[agent_action % len(valid_cards)]
                agent_hand.remove(agent_card)
                print(f"Agent plays: {agent_card}")
                if is_valid(agent_card, top_card):
                    top_card = agent_card
                    if not agent_hand:
                        print("Agent won!")
                        break
                # Update Q-table
                state = deck.index(agent_card)
                next_state = deck.index(player_hand[0] if player_hand else agent_hand[0])
                reward = 1 if not agent_hand else 0  
                update_q_table(q_table, state, deck.index(agent_card), reward, next_state)
            else:
                if not deck:
                    print("Deck is empty. Skipping agent's turn.")
                else:
                    deck, agent_cards = draw_card(deck)
                    state = deck.index(agent_cards)  
                    next_state = deck.index(player_hand[0] if player_hand else agent_hand[0])
                    reward = 0  
                    update_q_table(q_table, state, deck.index(agent_cards), reward, next_state)
                    agent_hand.append(agent_cards)
                    print(f"Agent draws: {agent_cards}")

            turn = 'user'

    return
play_game(deck.copy())  
