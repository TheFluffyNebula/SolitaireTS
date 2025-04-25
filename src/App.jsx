import React from "react";
import { useState, useEffect } from "react";

import './App.css'
import Tableau from "./components/Tableau/Tableau"
import Stock from "./components/Stock/Stock"
import Waste from "./components/Waste/Waste"
import Foundation from "./components/Foundation/Foundation"
import {splitDeck, VALUE_TO_NUMBER, SUIT_TO_COLOR} from "./js/createDeck"
import {drawCard} from "./js/gameLogic"

function App() {
  const [stockPile, setStockPile] = useState([]);
  const [wastePile, setWastePile] = useState([]);
  const [tableau, setTableau] = useState([]);
  const [foundation, setFoundation] = useState([[], [], [], []])

  let sampleCard1 = {
    suit: "♦", 
    value: 'A'
  }
  let sampleCard2 = {
    suit: "♣", 
    value: 'A'
  }
  // let sampleCard3 = {
  //   suit: "♠", 
  //   value: 'A'
  // }
  let sampleCard4 = {
    suit: "♥", 
    value: 'A'
  }

  useEffect(() => {
    // Only run once on component mount
    const deck = splitDeck();
    setStockPile(deck.stock);
    setTableau(deck.tableau);
    setFoundation([[sampleCard1], [sampleCard2], [], [sampleCard4]]);
  }, []);

  const handleDraw = () => {
    const { newStock, newWaste } = drawCard(stockPile, wastePile);
    setStockPile(newStock);
    setWastePile(newWaste);
  };

  function handleDropOnTableau(draggedCard, colIdx, cardSource) {
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
      // take last waste card (implemented as stack) and add it to the tableau column
      
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
  }

  return (
    <>
      <div className='app-top'>
        <div className='app-top-left'>
          <Stock stockPile={stockPile} onClick={handleDraw}></Stock>
          <Waste wastePile={wastePile}></Waste>
        </div>
        <Foundation foundationPiles={foundation}></Foundation>
      </div>
      <Tableau tableauPiles={tableau} onDropToTableau={handleDropOnTableau}></Tableau>
    </>
  )
}

export default App
