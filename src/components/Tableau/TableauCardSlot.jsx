import Card from "../Cards/Card";

function TableauCardSlot({ card, faceUp, topCard, colIdx, onDrop, isEmptySlot }) {
  function handleDragStart(e) {
    // console.log("dragging!");
    e.dataTransfer.setData("card", JSON.stringify(card));
    e.dataTransfer.setData("source", JSON.stringify("tableau"));
    e.dataTransfer.setData("fromColIdx", JSON.stringify(colIdx));
    if (topCard) {
      e.dataTransfer.setData("topCard", JSON.stringify("true"));
    } else {
      e.dataTransfer.setData("topCard", JSON.stringify("false"));
    }
  }

  if (isEmptySlot) {
    return (
      <div
        className="empty-tableau-column-slot"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const card = JSON.parse(e.dataTransfer.getData("card"));
          const source = JSON.parse(e.dataTransfer.getData("source"));
          const fromColIdx = parseInt(e.dataTransfer.getData("fromColIdx") || "-1");
          onDrop(card, colIdx, source, fromColIdx);
        }}
      />
    );
  }

  return (
    <div className="tableau-card-slot">
      {card ? (
        faceUp ? (
          <div draggable={faceUp} onDragStart={handleDragStart}>
            <Card card={card} />
          </div>
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
