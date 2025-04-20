import './Waste.css'
import Card from "../Cards/Card";

// if there's at least one card, render the last one
// if there's no card, visibility hidden
function Waste({ wastePile }) {
    const hasCards = wastePile.length > 0;
    console.log(wastePile.at(-1));
    let card = null;
    if (hasCards) {
        card = wastePile.at(-1);
    }
    return (
        <div className="wasteContainer">
            {hasCards ? (
                <Card card={card}></Card>
            ) : (
                <div className="empty-slot" />
            )}
        </div>
    );
}

export default Waste
