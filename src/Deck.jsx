import Card from "./card";
/**
 * State:
 *  none
 *
 * Props:
 * deck
 *
 * (dumb component)
 *
 * App -> CardApp -> Card
 *
 */

export default function Deck({ deck }) {
  return (
    <div className="Deck">
      {deck.map((card) => (
        <Card image_url={card.image}></Card>
      ))}
    </div>
  );
}
