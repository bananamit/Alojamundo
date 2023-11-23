import { useQuery } from "react-query";
import Nav from "../components/Nav";
import PropertyCard from "../components/PropertyCard";
import "./Home.css";

const fetchAccommodations = async () => {
  const response = await fetch("https://alojamundobackend.onrender.com/accomodation");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function Home() {
  const {
    data: properties,
    isLoading,
    error,
  } = useQuery("accommodations", fetchAccommodations);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="home-container">
      <Nav />
      <div className="search-bar">
        <input type="text" placeholder="Buscar..." />
        <button className="search-button">🔍</button>
      </div>
      <div className="properties-list">
        <div className="properties-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              image={property.image}
              title={property.title}
              description={property.description}
              price={property.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
