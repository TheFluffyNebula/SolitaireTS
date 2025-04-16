import Card from "./Card";

function CardSlot({ card, draggable, onClick }) {
  return (
    <div className="card-slot" draggable={!!card && draggable} onClick={onClick}>
      {card ? (
        <Card card={card} faceUp={card.faceUp} />
      ) : (
        // null // or <div className="empty-slot" /> if you want a visible placeholder
        <div className="empty-slot" />
      )}
    </div>
  );
}

export default CardSlot;
