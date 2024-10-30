export const isCardPlayable = (card, topCard) => {
    if (card.action === 'wild_card' || card.action === '+4') return true;
    if (card.color === topCard.color) return true;
    if (card.number !== undefined && card.number === topCard.number) return true;
    if (card.action && card.action === topCard.action && 
        card.action !== 'wild_card' && card.action !== '+4') return true;
    return false;
  };