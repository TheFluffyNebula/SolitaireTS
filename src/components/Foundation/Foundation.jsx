import React from "react";
import { useState, useEffect } from "react";

import './Foundation.css'
import FoundationCardSlot from './FoundationCardSlot.jsx'

// 4 card slots, render top card
function Foundation({ foundationPiles }) {
    const [foundation, setFoundation] = useState([]);

    useEffect(() => {
        if (foundationPiles) {
            setFoundation(foundationPiles);
        }
    }, [foundationPiles]);

    return (
        <div className="foundationContainer">
            {foundation.map((pile, idx) => {
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
