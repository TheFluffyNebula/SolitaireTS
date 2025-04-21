import React from "react";
import { useState, useEffect } from "react";

import './Stock.css'

// if there's a card, facedown
// if there's no card, visibility hidden
function Stock({ stockPile }) {
    const [stock, setStock] = useState([]);

    useEffect(() => {
        if (stockPile) {
            setStock(stockPile);
        }
    }, [stockPile])

    const hasCards = stock.length > 0;
    return (
        <div className="stockContainer">
            {hasCards ? (
                <div className="card face-down" />
            ) : (
                <div className="empty-slot" />
            )}
        </div>
    );
}

export default Stock
