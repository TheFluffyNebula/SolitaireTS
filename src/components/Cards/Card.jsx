import './Card.css';

function Card({ card }) {
  const { suit, value } = card;

  return (
    <div className="card">
      <div className="corner top-left">
        <div>{value}</div>
        <div>{suit}</div>
      </div>
      <div className="center">
        <div>{value} {suit}</div>
      </div>
      <div className="corner bottom-right">
        <div>{value}</div>
        <div>{suit}</div>
      </div>
    </div>
  );
}

export default Card;
