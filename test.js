// tableau to tableau, moving cards
let tab1 = [10, 9, 8, 7, 6]
// goal: move 8 7 6 over to tab2
let tab2 = [11, 10, 9]
const idx = 2;
// console.log(tab1.slice(2));
const numsToMove = tab1.slice(idx);
tab1 = tab1.slice(0, 2);
tab2 = [...tab2, ...numsToMove]
console.log(tab1);
console.log(tab2);
