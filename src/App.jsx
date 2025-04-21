import React from "react";
import { useState, useEffect } from "react";

import './App.css'
import Tableau from "./components/Tableau/Tableau"
import Stock from "./components/Stock/Stock"
import Waste from "./components/Waste/Waste"
import Foundation from "./components/Foundation/Foundation"
import createDeck from "./js/createDeck"

function App() {
  const [stockPile, setStockPile] = useState([]);
  const [wastePile, setWastePile] = useState([]);
  const [tableau, setTableau] = useState([]);
  const [foundation, setFoundation] = useState([[], [], [], []])

  let sampleCard = {
    suit: "♠", 
    value: 'A'
  }

  useEffect(() => {
    // Only run once on component mount
    const deck = createDeck.splitDeck();
    setStockPile(deck.stock);
    setTableau(deck.tableau);
    setFoundation([[sampleCard], [sampleCard], [], [sampleCard]]);
  }, []);

  return (
    <>
      <div className='app-top'>
        <div className='app-top-left'>
          <Stock stockPile={stockPile}></Stock>
          <Waste wastePile={wastePile}></Waste>
        </div>
        <Foundation foundationPiles={foundation}></Foundation>
      </div>
      <Tableau tableauPiles={tableau}></Tableau>
    </>
  )
}

export default App
