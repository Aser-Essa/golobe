import { getCards } from "#/server/stripe";
import { useEffect, useState } from "react";

export function useCards() {
  const [cards, setCards] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCards().then((data) => {
      setCards(data.cards || []);
      setLoading(false);
    });
  }, []);

  return { cards, loading };
}
