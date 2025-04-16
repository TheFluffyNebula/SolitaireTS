import createDeck from "./createDeck.js"

const splitDeck = (deck) => {
    // output format: 
    // foundation: 1, 2, 3, 4, 5, 6, 7
    // stock: 24
    let splitDeck = {
        foundation: Array.from({ length: 7 }, () => []),
        stock: []
    }
    let cur = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j <= i; j++) {
            splitDeck.foundation[i].push(deck[cur++]);
        }
    }
    for (let i = 0; i < 24; i++) {
        splitDeck.stock.push(deck[cur++]);
    }
    // console.log(splitDeck.foundation);
    return splitDeck;
}

// let deck = createDeck.generateDeck();
// console.log(deck);
// let splitDeck = distributeDeck(deck);
// console.log(splitDeck);
// splitDeck.foundation.forEach((pile, index) => {
//     console.log(`Pile ${index + 1}:`);
//     pile.forEach(card => console.log(`  ${card.value} of ${card.suit}`));
// });
export default {splitDeck};
