import Card from "../Cards/Card";

function TableauCardSlot({ card, faceUp, topCard }) {

  return (
    <div className="tableau-card-slot" draggable={faceUp}
        onDragStart={(e) => {
            e.dataTransfer.setData(
            "card",
            JSON.stringify({ ...card, topCard }) // send topCard info with the drag
            );
        }}
    >
      {card ? (
        faceUp ? (
          <Card card={card} />
        ) : (
          <div className="card face-down" />
        )
      ) : (
        <div className="empty-tableau-slot" />
      )}
    </div>
  );
}

export default TableauCardSlot;
