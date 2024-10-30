export const CARD_COLORS = {
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'green',
    YELLOW: 'yellow',
    BLACK: 'black' // for wild cards
  };
  
  export const CARD_ACTIONS = {
    SKIP: 'skip',
    REVERSE: 'reverse',
    DRAW_TWO: 'draw_two',
    WILD: 'wild',
    WILD_DRAW_FOUR: 'wild_draw_four'
  };
  
  export const CARD_NUMBERS = Array.from({ length: 10 }, (_, i) => i.toString());
  
  export const COLOR_STYLES = {
    [CARD_COLORS.RED]: {
      background: 'bg-red-600',
      border: 'border-red-400',
      text: 'text-red-100',
      hover: 'hover:bg-red-500'
    },
    [CARD_COLORS.BLUE]: {
      background: 'bg-blue-600',
      border: 'border-blue-400',
      text: 'text-blue-100',
      hover: 'hover:bg-blue-500'
    },
    [CARD_COLORS.GREEN]: {
      background: 'bg-green-600',
      border: 'border-green-400',
      text: 'text-green-100',
      hover: 'hover:bg-green-500'
    },
    [CARD_COLORS.YELLOW]: {
      background: 'bg-yellow-500',
      border: 'border-yellow-300',
      text: 'text-yellow-100',
      hover: 'hover:bg-yellow-400'
    },
    [CARD_COLORS.BLACK]: {
      background: 'bg-gray-800',
      border: 'border-gray-600',
      text: 'text-white',
      hover: 'hover:bg-gray-700'
    }
  };
  
  export const GAME_STATES = {
    WAITING: 'waiting',
    PLAYING: 'playing',
    GAME_OVER: 'game_over'
  };
  
  export const PLAYERS = {
    HUMAN: 'human',
    AI: 'ai'
  };