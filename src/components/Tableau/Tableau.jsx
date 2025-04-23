import React from "react";

import './Tableau.css'
import TableauCardSlot from './TableauCardSlot.jsx'

// 7 columns of 13 card slots
// given 7 arrays, update the card slots of the corresponding piles
function Tableau({ tableauPiles }) {
    return (
        <div className="tableauContainer">
            {tableauPiles.map((pile, colIdx) => (
                <div className="tableauColumn" key={colIdx}>
                    {Array.from({ length: 13 }, (_, rowIdx) => {
                        const card = pile[rowIdx] || null;
                        const faceUp = card?.faceUp || false;
                        const topCard = rowIdx === pile.length - 1; // top card in the column
                        // console.log(topCard);
            
                        return (
                          <TableauCardSlot
                            key={rowIdx}
                            card={card}
                            faceUp={faceUp}
                            topCard={topCard}
                            onClick={() =>
                              console.log(`Clicked card at col ${colIdx}, row ${rowIdx}`)
                            }
                          />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default Tableau
