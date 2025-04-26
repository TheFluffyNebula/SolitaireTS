import React from "react";

import './Foundation.css'
import FoundationCardSlot from './FoundationCardSlot.jsx'

// 4 card slots, render top card
function Foundation({ foundationPiles, onDropToFoundation }) {
    return (
        <div className="foundationContainer">
            {foundationPiles.map((pile, idx) => {
                const topCard = pile.length > 0 ? pile[pile.length - 1] : null;
                return (
                    <div className="foundationPile" 
                        key={idx}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            try {
                                const card = JSON.parse(e.dataTransfer.getData("card"));
                                const cardSource = JSON.parse(e.dataTransfer.getData("source"));
                                // console.log("Card dropped!", card);
                                onDropToFoundation(card, idx, cardSource);    
                            } catch {
                                // console.log("Invalid move!");
                            }
                        }}
                    >
                        <FoundationCardSlot card={topCard}/>
                    </div>
                );
            })}
        </div>
    );
}

export default Foundation
