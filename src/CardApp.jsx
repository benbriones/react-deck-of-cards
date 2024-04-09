import React, { useState, useEffect } from "react";


const BASE_CARD_API_URL = "https://deckofcardsapi.com/api";
/** Component for CardApp
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
        deck: []
    });

    console.log("beforre useeffect", cards);

    useEffect(function fetchDeckWhenMount() {

        async function fetchDeck() {
            const response = await fetch(`${BASE_CARD_API_URL}/deck/new/`)
            const deckData = await response.json();

            setCards(c => (

                {...c,
                    deckId: deckData.deck_id,
                    isLoading: false}
            ))
        }

        fetchDeck();


    }, []);

    async function getCard() {
        // setCards(cards.isLoading = true );

        const response = await fetch(
            `${BASE_CARD_API_URL}/deck/${cards.deckId}/draw/?count=1`);
        const drawData = await response.json();
        console.log("drwawdata", drawData)

        setCards(currCards => ({
            ...currCards,
            deck: [...currCards.deck, drawData.cards[0]],
            remaining: drawData.remaining,}))

        console.log("cards in getCard()", cards)

    }

    function handleDraw() {
        getCard();
        // setCards(cards.isLoading = false );
        console.log("cards in handledraw()", cards)
    }

    if (cards.isLoading) return <div>Loading.....</div>

    return (
        <div>
            <button onClick={handleDraw}>Draw new cards!</button>
        </div>
    )

}

