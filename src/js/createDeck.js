const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const generateDeck = () => {
  // console.log("creating deck");
  const unshuffled = SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return { suit, value };
    });
  });
  // console.log(unshuffled);
  const shuffled = [...unshuffled];
  for (let i = 51; i > 0; i--) {
    const newIndex = Math.floor(Math.random() * (i + 1));
    const oldValue = shuffled[newIndex];
    shuffled[newIndex] = shuffled[i];
    shuffled[i] = oldValue;
  }
  // console.log(shuffled[0].suit);
  return shuffled;
};

const splitDeck = () => {
  let deck = generateDeck();
  // output format: 
  // tableau: 1, 2, 3, 4, 5, 6, 7
  // stock: 24
  let splitDeck = {
      tableau: Array.from({ length: 7 }, () => []),
      stock: []
  }
  let cur = 0;
  for (let i = 0; i < 7; i++) {
      for (let j = 0; j <= i; j++) {
          splitDeck.tableau[i].push(deck[cur++]);
      }
  }
  for (let i = 0; i < 24; i++) {
      splitDeck.stock.push(deck[cur++]);
  }
  // console.log(splitDeck.tableau);
  return splitDeck;
}

// splitDeck();

export default {splitDeck};
