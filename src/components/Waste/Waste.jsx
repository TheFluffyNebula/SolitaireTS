import React from "react";

import './Waste.css'
import Card from "../Cards/Card";

// if there's at least one card, render the last one
// if there's no card, visibility hidden
function Waste({ wastePile }) {
    const hasCards = wastePile.length > 0;
    const card = hasCards ? wastePile.at(-1) : null;
    return (
        <div className="wasteContainer">
            {hasCards ? (
                <Card card={card}></Card>
            ) : (
                <div className="empty-waste-slot" />
            )}
        </div>
    );
}

export default Waste
