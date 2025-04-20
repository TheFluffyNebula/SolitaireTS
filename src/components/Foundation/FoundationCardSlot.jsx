import Card from "../Cards/Card";

function FoundationCardSlot({ card, }) {

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
        <div className="empty-slot" />
      )}
    </div>
  );
}

export default FoundationCardSlot;
