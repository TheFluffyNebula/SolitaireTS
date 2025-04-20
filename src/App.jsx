import './App.css'
import Tableau from "./components/Tableau/Tableau"
import Stock from "./components/Stock/Stock"
import Waste from "./components/Waste/Waste"
import Foundation from "./components/Foundation/Foundation"
import createDeck from "./js/createDeck"

function App() {
  let deck = createDeck.splitDeck();
  let tableau = deck.tableau;
  let stock = deck.stock;
  let sampleCard = {
    suit: "♠", 
    value: 'A'
  }
  let waste = [sampleCard];
  let foundation = [[sampleCard], [sampleCard], [], [sampleCard]];
  return (
    <>
      <div className='app-top'>
        <div className='app-top-left'>
          <Stock stockPile={stock}></Stock>
          <Waste wastePile={waste}></Waste>
        </div>
        <Foundation foundationPiles={foundation}></Foundation>
      </div>
      <Tableau tableauPiles={tableau}></Tableau>
    </>
  )
}

export default App
