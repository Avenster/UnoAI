export const isCardPlayable = (card, topCard) => {
    if (!card || !topCard) return false;
    if (card.action === 'wild_card' || card.action === '+4') return true;
    return card.color === topCard.color || 
           card.number === topCard.number || 
           (card.action && card.action === topCard.action);
  };
  