import Card from "../Cards/Card.tsx";

function FoundationCardSlot({ card }) {
  // console.log(card);
  return (
    <div className="foundation-card-slot" draggable={true}
        onDragStart={(e) => {
            e.dataTransfer.setData(
            "card",
            JSON.stringify({ ...card, })
            );
        }}
    >
      {card ? (
        <Card card={card} /> 
      ) : (
        <div className="empty-foundation-slot" />
      )}
    </div>
  );
}

export default FoundationCardSlot;
