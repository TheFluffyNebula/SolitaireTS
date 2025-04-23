import React from "react";
import { useState, useEffect } from "react";

import './App.css'
import Tableau from "./components/Tableau/Tableau"
import Stock from "./components/Stock/Stock"
import Waste from "./components/Waste/Waste"
import Foundation from "./components/Foundation/Foundation"
import createDeck from "./js/createDeck"
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
    const deck = createDeck.splitDeck();
    setStockPile(deck.stock);
    setTableau(deck.tableau);
    setFoundation([[sampleCard1], [sampleCard2], [], [sampleCard4]]);
  }, []);

  const handleDraw = () => {
    const { newStock, newWaste } = drawCard(stockPile, wastePile);
    setStockPile(newStock);
    setWastePile(newWaste);
  };

  function handleDropOnTableau(draggedCard, colIdx) {
    console.log(draggedCard);
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
      <Tableau tableauPiles={tableau}></Tableau>
    </>
  )
}

export default App
