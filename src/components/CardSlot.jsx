import Card from "./Card";

function CardSlot({ card, faceUp, draggable, onClick }) {
  return (
    <div className="card-slot" draggable={!!card && draggable} onClick={onClick}>
      {card ? (
        <Card card={card} faceUp={faceUp} />
      ) : (
        // null or <div className="empty-slot" /> for a visible placeholder
        <div className="empty-slot" />
      )}
    </div>
  );
}

export default CardSlot;
