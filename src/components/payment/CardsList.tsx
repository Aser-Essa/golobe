import { getCards } from "#/server/stripe";
import { useEffect, useState } from "react";

export default function CardsList() {
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    getCards().then((data) => {
      setCards(data.cards || []);
    });
  }, []);

  return (
    <div>
      <h2>Your Cards</h2>

      {cards.length === 0 && <p>No cards found</p>}

      {cards.map((card) => (
        <div key={card.id}>
          <p>{card.card.brand}</p>
          <p>**** {card.card.last4}</p>
          <p>
            {card.card.exp_month}/{card.card.exp_year}
          </p>
        </div>
      ))}
    </div>
  );
}
