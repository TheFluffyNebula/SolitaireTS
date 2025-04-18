import './App.css'
import Tableau from "./components/Tableau/Tableau"
import createDeck from "./js/createDeck"

function App() {
  let deck = createDeck.splitDeck();
  let piles = deck.tableau;
  return (
    <>
      <Tableau tableauPiles={piles}></Tableau>
    </>
  )
}

export default App
