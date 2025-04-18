import Card from "../Cards/Card";

function TableauCardSlot({ card, faceUp, topCard }) {

  return (
    <div className="card-slot" draggable={faceUp} topCard={topCard}
        onDragStart={(e) => {
            e.dataTransfer.setData(
            "card",
            JSON.stringify({ ...card, topCard }) // send topCard info with the drag
            );
        }}
    >
      {card ? (
        <Card card={card} faceUp={faceUp} />
      ) : (
        <div className="empty-slot" />
      )}
    </div>
  );
}

export default TableauCardSlot;
