import React from "react";
import { useState, useEffect } from "react";

import './Waste.css'
import Card from "../Cards/Card";

// if there's at least one card, render the last one
// if there's no card, visibility hidden
function Waste({ wastePile }) {
    const [waste, setWaste] = useState([]);

    useEffect(() => {
        if (wastePile) {
            setWaste(wastePile);
        }
    }, [wastePile]);

    const hasCards = waste.length > 0;
    // console.log(waste.at(-1));
    let card = null;
    if (hasCards) {
        card = waste.at(-1);
    }
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
