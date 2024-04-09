import React, { useState, useEffect } from "react";
import Deck from "./Deck";

const BASE_CARD_API_URL = "https://deckofcardsapi.com/api";

/** Component for CardApp
 *
 *
 * State: cards
 * {deckId: 45hf,
 * remaining: null,
 * shuffled: false,
 * isLoading: true,
 * deck: []}
 *
 * Props: none
 *
 *
 * App -> CardApp -> Deck
 *
 */

export default function CardApp() {
  const [cards, setCards] = useState({
    deckId: null,
    remaining: 52,
    shuffled: false,
    isLoading: true,
    deck: [],
  });

  useEffect(function fetchDeckWhenMount() {
    async function fetchDeck() {
      const response = await fetch(`${BASE_CARD_API_URL}/deck/new/`);
      const deckData = await response.json();

      setCards((c) => ({ ...c, deckId: deckData.deck_id, isLoading: false }));
    }

    fetchDeck();
  }, []);

  async function getCard() {
    const response = await fetch(
      `${BASE_CARD_API_URL}/deck/${cards.deckId}/draw/?count=1`
    );
    const drawData = await response.json();

    setCards((currCards) => ({
      ...currCards,
      deck: [...currCards.deck, drawData.cards[0]],
      remaining: drawData.remaining,
    }));
    setCards((c) => ({ ...c, isLoading: false }));
  }

  function handleDraw() {
    if (cards.remaining === 0) {
      return <p>No cards remaining.</p>;
    } else {
      setCards((c) => ({ ...c, isLoading: true }));
      getCard();
    }
  }

  if (cards.remaining === 0) {
    return <p>No cards remaining.</p>;
  }

  if (cards.isLoading) return <div>Loading.....</div>;

  return (
    <main className="CardApp">
      <button disabled={cards.remaining === 0} onClick={handleDraw}>
        Draw new cards!
      </button>
      <Deck deck={cards.deck} />
    </main>
  );
}
