import React from "react";

import './Foundation.css'
import FoundationCardSlot from './FoundationCardSlot.jsx'

// 4 card slots, render top card
function Foundation({ foundationPiles }) {
    return (
        <div className="foundationContainer">
            {foundationPiles.map((pile, idx) => {
                const topCard = pile.length > 0 ? pile[pile.length - 1] : null;
                return (
                    <div className="foundationPile" key={idx}>
                        <FoundationCardSlot card={topCard}/>
                    </div>
                );
            })}
        </div>
    );
}

export default Foundation
