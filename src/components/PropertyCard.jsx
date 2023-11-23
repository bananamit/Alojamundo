import "./PropertyCard.css";

function PropertyCard({ image, title, description, price }) {
  return (
    <div className="property-card">
      <img src={image} alt={title} className="property-image" />
      <div className="property-details">
        <h2 className="property-title">{title}</h2>
        <p className="property-description">{description}</p>
        <p className="property-price">{price}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
