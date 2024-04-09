import Card from "./card";
/**
 * State:
 *  none
 *
 * Props:
 * image_url
 *
 * (dumb component)
 *
 * App -> CardApp -> Card
 *
 */

export default function Deck({ deck }) {
  console.log(deck);
  return <div className="Deck">
    {deck.map(card => <Card image_url={card.image}></Card>)}
    </div>;
}
