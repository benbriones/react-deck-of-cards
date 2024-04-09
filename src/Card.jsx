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

export default function Card({ image_url }) {
    return (
      <div className="Card">
        <img src={image_url} alt="card" />
      </div>
    );
  }
