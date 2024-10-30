import random

colors = ['red', 'blue', 'green', 'yellow']
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
special_cards = ['Skip', 'Reverse', 'DrawTwo']
deck = [f"{color} {number}" for color in colors for number in numbers] + [f"{color} {special_card}" for color in colors for special_card in special_cards]

random.shuffle(deck)

discard_pile = [deck.pop(random.randint(0, len(deck) - 1))]
user_hand = random.sample(deck, 5)
agent_hand = random.sample(deck, 5)
current_player = 'user'

def has_won(hand):
    return not bool(hand)

def is_valid(card):
    top_card = discard_pile[-1]

    if card.split()[0] == top_card.split()[0] and card.split()[1] in special_cards:
        return True

    if not card.split()[1] in special_cards and (card.split()[0] == top_card.split()[0] or card.split()[1] == top_card.split()[1]):
        return True

    return card.split()[0] == top_card.split()[0] or card.split()[1] == top_card.split()[1]

def play_card(card, hand):
    global current_player

    if card is not None:
        if is_valid(card) and card in hand:
            if card.split()[1] == 'Skip':
                print("Opponent's move skipped.")
            elif card.split()[1] == 'Reverse':
                print("Reversed.")
            elif card.split()[1] == 'DrawTwo':
                draw_two_and_skip(current_player)


            hand.remove(card)
            print(f"{current_player.capitalize()} played: {card}")
            discard_pile.append(card)

            if card.split()[1] not in ['Skip', 'Reverse', 'DrawTwo']:
                current_player = 'agent' if current_player == 'user' else 'user'
        else:
            print(f"Invalid move. {current_player.capitalize()} must play a valid card.")
    else:
        print("Invalid move. Please enter a valid card.")

def draw_two_and_skip(current_player):
    next_player = 'agent' if current_player == 'user' else 'user'
    print(f"{next_player.capitalize()} must draw two cards from the pile and skip their turn.")

    for _ in range(2):
        if current_player == 'user':
            agent_hand.append(deck.pop())
        else:
            user_hand.append(deck.pop())

    current_player = 'agent' if current_player == 'agent' else 'user'


def agent_turn():
    global current_player

    if current_player == 'agent':
        wild_draw_four_moves = [card for card in agent_hand if 'Wild DrawFour' in card]
        if wild_draw_four_moves:
            selected_card = wild_draw_four_moves[0]
        else:
            same_color_special_moves = [card for card in agent_hand if card.split()[1] in ['DrawTwo', 'Reverse', 'Skip'] and card.split()[0] == discard_pile[-1].split()[0]]
            if same_color_special_moves:
                selected_card = same_color_special_moves[0]
            else:
                valid_moves = [card for card in agent_hand if is_valid(card)]
                selected_card = None
                for move in valid_moves:
                    if move.split()[0] == discard_pile[-1].split()[0] or move.split()[1] == discard_pile[-1].split()[1]:
                        selected_card = move
                        break

        if selected_card:
            print(f"{current_player.capitalize()} played: {selected_card}")
            play_card(selected_card, agent_hand)
        else:
            drawn_card = deck.pop()
            print(f"{current_player.capitalize()} drew a card: {drawn_card}")
            agent_hand.append(drawn_card)
            current_player = 'user'





def get_user_input():
    try:
        selected_card = input("Your turn! Enter the color and value of the card you want to play (e.g., red 3 or red Draw Two), or type 'draw' to draw a card: ")
        return selected_card
    except ValueError:
        print("Invalid input. Please enter the color and value separated by a space or type 'draw'.")
        return get_user_input()

def user_turn():
    global current_player
    if current_player == 'user':
        selected_card = get_user_input()

        if selected_card.lower() == 'draw':
            drawn_card = deck.pop()
            print(f"{current_player.capitalize()} drew a card: {drawn_card}")
            user_hand.append(drawn_card)
            current_player = 'agent' if current_player == 'user' else 'user'
        elif is_valid(selected_card):
          play_card(selected_card, user_hand)

        else:
            while not is_valid(selected_card):
                print(f"Invalid move. {current_player.capitalize()} must play a valid card or type 'draw' to draw a card.")
                selected_card = get_user_input()


def play_uno_game():
    global current_player

    while True:
        print("\n" + "=" * 30)
        print(f"Top Card on Discard Pile: {discard_pile[-1]}")
        print(f"User Hand: {user_hand}")
        print(f"Agent Hand: {agent_hand}")

        if current_player == 'user':
            user_turn()

        else:
            agent_turn()


        if has_won(user_hand):
            print("Congratulations! You have won!")
            break
        elif has_won(agent_hand):
            print("Agent has won. Better luck next time!")
            break

