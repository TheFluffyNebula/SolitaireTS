import Card from "./Card";

function CardSlot({ card, faceUp, isTopCard, draggable, onClick }) {
  const isDraggable = !!card && faceUp && draggable && isTopCard;

  return (
    <div className="card-slot" draggable={isDraggable} onClick={onClick}>
      {card ? (
        <Card card={card} faceUp={faceUp} />
      ) : (
        <div className="empty-slot" />
      )}
    </div>
  );
}


export default CardSlot;
