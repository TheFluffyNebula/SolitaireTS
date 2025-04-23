import Card from "../Cards/Card";

function TableauCardSlot({ card, faceUp, topCard }) {

  return (
    <div className="tableau-card-slot" draggable={faceUp}
        // onDragStart={(e) => {
        //     e.dataTransfer.setData(
        //     "card",
        //     JSON.stringify({ ...card, topCard }) // send topCard info with the drag
        //     );
        // }}
        onDragOver={(e) => e.preventDefault()} // allow drop
        onDrop={(e) => {
          const draggedCard = JSON.parse(e.dataTransfer.getData("card"));
          console.log("Dropped card on tableau:", draggedCard);

          // onDropCard(draggedCard, colIdx);
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
