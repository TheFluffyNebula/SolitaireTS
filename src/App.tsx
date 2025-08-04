import React from "react";
import { useState, useEffect } from "react";

import './App.css'
import Tableau from "./components/Tableau/Tableau.js"
import Stock from "./components/Stock/Stock.js"
import Waste from "./components/Waste/Waste.jsx"
import Foundation from "./components/Foundation/Foundation.js"
import {splitDeck, VALUE_TO_NUMBER, SUIT_TO_COLOR} from "./js/createDeck.js"
import {drawCard} from "./js/gameLogic.js"

function App() {
  const [stockPile, setStockPile] = useState([]);
  const [wastePile, setWastePile] = useState([]);
  const [tableau, setTableau] = useState([]);
  const [foundation, setFoundation] = useState([[], [], [], []])

  // let sampleCard1 = {
  //   suit: "♦", 
  //   value: 'A'
  // }
  // let sampleCard2 = {
  //   suit: "♣", 
  //   value: 'A'
  // }
  // let sampleCard3 = {
  //   suit: "♠", 
  //   value: 'A'
  // }
  // let sampleCard4 = {
  //   suit: "♥", 
  //   value: 'A'
  // }

  useEffect(() => {
    // Only run once on component mount
    const deck = splitDeck();
    setStockPile(deck.stock);
    setTableau(deck.tableau);
    setFoundation([[], [], [], []]);
  }, []);

  const handleDraw = () => {
    const { newStock, newWaste } = drawCard(stockPile, wastePile);
    setStockPile(newStock);
    setWastePile(newWaste);
  };

  function handleDropOnTableau(draggedCard, colIdx, cardSource, fromColIdx = -1) {
    function wasteToTableau() {
      // Make a copy of wastePile and tableau
      const newWaste = [...wastePile];
      const cardToMove = newWaste.pop(); // remove top card from waste
      cardToMove.faceUp = true;

      const newTableau = [...tableau];
      const updatedColumn = [...newTableau[colIdx], cardToMove]; // add card to the target column
      newTableau[colIdx] = updatedColumn;

      setWastePile(newWaste);
      setTableau(newTableau);
    }

    // information we have: colIdx (drop location)
    function tableauToTableau() {
      // console.log("Card from column", fromColIdx);
      if (fromColIdx == -1) {
        console.log("tableau-to-tableau: fromCol = -1");
        return;
      }
      if (fromColIdx == colIdx) {
        return;
      }
      // valid move: move all cards from tableau[fromColIdx] past the card to tableau[colIdx]
      console.log("Valid move!");
      // TODO: implement logic
      const newTableau = [...tableau];
      let tab1 = [...tableau[fromColIdx]];
      let tab2 = [...tableau[colIdx]];
      // moving from tab1 onto tab2
      const idx = newTableau[fromColIdx].findIndex(
        (c) => c.suit === draggedCard.suit && c.value === draggedCard.value
      );
      const numsToMove = tab1.slice(idx);
      tab1 = tab1.slice(0, idx);
      // make the card under it face up
      if (tab1.length > 0) {
        tab1[tab1.length - 1].faceUp = true;
      }
      tab2 = [...tab2, ...numsToMove]
      newTableau[fromColIdx] = tab1;
      newTableau[colIdx] = tab2;
      setTableau(newTableau);
    }

    // console.log("App hDOT", draggedCard, colIdx, cardSource);
    if (!draggedCard) {
      return;
    }

    // common functionality: if king, put into empty slot regardless of source (waste, tableau, foundation)
    const color = SUIT_TO_COLOR[draggedCard.suit];
    const value = VALUE_TO_NUMBER[draggedCard.value];
    // console.log(value);

    const tableauCard = tableau.at(colIdx).at(-1);
    // console.log("App hDOT", draggedCard, colIdx, cardSource);
    if (!tableauCard) {
      if (value != 13) {
        return;
      }
      // move the king to the empty square
      if (cardSource == "waste") {
        wasteToTableau();
      } else if (cardSource == "tableau") {
        // console.log("Hey!!");
        tableauToTableau();
      }
      return;
    }

    // common functionality: checking if it's a valid move
    const tableauColor = SUIT_TO_COLOR[tableauCard.suit];
    const tableauValue = VALUE_TO_NUMBER[tableauCard.value];
    // console.log(tableauColor, tableauValue);
    if (color == tableauColor || tableauValue - value != 1) {
      return;
    }
    // console.log("Valid move!");

    if (cardSource == "waste") {      
      wasteToTableau();
    } else if (cardSource == "tableau") {
      // console.log("Hey!!");
      tableauToTableau();
    }
  }

  function handleDropOnFoundation(draggedCard, colIdx, cardSource, fromColIdx, topCard) {
    function wasteToFoundation() {
      // Make a copy of wastePile and foundation
      const newWaste = [...wastePile];
      const cardToMove = newWaste.pop(); // remove top card from waste
      cardToMove.faceUp = true;

      const newFoundation = [...foundation];
      const updatedColumn = [...newFoundation[colIdx], cardToMove]; // add card to the target column
      newFoundation[colIdx] = updatedColumn;

      setWastePile(newWaste);
      setFoundation(newFoundation);
    }

    function tableauToFoundation() {
      // must be top tableau card
      if (!topCard) {
        return;
      }
      // move the top card from tableau[fromColIdx] to foundation[colIdx]
      // Make a copy of tableauPile and foundation
      const newTableau = [...tableau];
      let tab1 = [...tableau[fromColIdx]];
      const cardToMove = tab1.pop(); // remove top card from waste
      // make next card below face-up
      if (tab1.length > 0) {
        tab1.at(-1).faceUp = true;
      }
      newTableau[fromColIdx] = tab1;

      const newFoundation = [...foundation];
      const updatedColumn = [...newFoundation[colIdx], cardToMove]; // add card to the target column
      newFoundation[colIdx] = updatedColumn;

      setTableau(newTableau);
      setFoundation(newFoundation);
    }

    // console.log("App hDOF", draggedCard, colIdx, cardSource);
    if (!draggedCard) {
      return;
    }

    // common functionality: if ace, put into empty slot regardless of source (waste, tableau)
    const suit = draggedCard.suit;
    const value = VALUE_TO_NUMBER[draggedCard.value];
    // console.log(value);

    const foundationCard = foundation.at(colIdx).at(-1);
    // console.log("App hDOT", draggedCard, colIdx, cardSource);
    if (!foundationCard) {
      if (value != 1) {
        return;
      }
      // move the ace to the empty square
      if (cardSource == "waste") {
        wasteToFoundation();
      } else if (cardSource == "tableau") {
        tableauToFoundation();
      }
      return;
    }

    // common functionality: checking if it's a valid move
    const foundationSuit = foundationCard.suit;
    const foundationValue = VALUE_TO_NUMBER[foundationCard.value];
    // console.log(foundationColor, foundationValue);
    if (suit != foundationSuit || value - foundationValue != 1) {
      return;
    }
    // console.log("Valid move!");

    if (cardSource == "waste") {      
      wasteToFoundation();
    } else if (cardSource == "tableau") {
      tableauToFoundation();
    }
  }

  return (
    <>
      <div className='app-top'>
        <div className='app-top-left'>
          <Stock stockPile={stockPile} onClick={handleDraw}></Stock>
          <Waste wastePile={wastePile}></Waste>
        </div>
        <Foundation foundationPiles={foundation} onDropToFoundation={handleDropOnFoundation}></Foundation>
      </div>
      <Tableau tableauPiles={tableau} onDropToTableau={handleDropOnTableau}></Tableau>
    </>
  )
}

export default App
