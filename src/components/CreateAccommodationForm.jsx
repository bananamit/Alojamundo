import { useState } from "react";
import "./CreateAccommodationForm.css"; // Asegúrate de que tienes estilos adecuados para el formulario
import Nav from "./Nav";
import useCreateAccommodation from "../hooks/useCreateAccommodation";

function CreateAccommodationForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [extraPrice, setExtraPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [address, setAddress] = useState("");
  const [amenities, setAmenities] = useState({
    wifi: false,
    kitchen: false,
    tv: false,
    airConditioning: false,
    heating: false,
    freeParking: false,
  });

  const { mutate: createAccommodation } = useCreateAccommodation();

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setAmenities((prevAmenities) => ({
      ...prevAmenities,
      [name]: checked,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("capacity", capacity);
    formData.append("extraPrice", extraPrice);
    formData.append("address", address);
    formData.append("amenities", JSON.stringify(amenities));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Llama a la mutación
    createAccommodation(formData, {
      onSuccess: (data) => {
        console.log("Alojamiento creado con éxito:", data);
      },
      onError: (error) => {
        console.error("Error al crear el alojamiento:", error);
      },
    });
  };

  return (
    <div>
      <Nav></Nav>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="create-listing-form"
      >
        <div className="listing-details">
          <div className="input-group">
            <label htmlFor="title">Título de tu alojamiento</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ejemplo: Acogedor apartamento en el centro de la ciudad"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Describe tu espacio</label>
            <p className="help-block">
              En este paso, te preguntaremos qué tipo de propiedad tienes y si
              los huéspedes reservarán el alojamiento entero o solo una
              habitación. A continuación, indícanos la ubicación y cuántos
              huéspedes pueden quedarse.
            </p>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalla lo que ofreces, la ubicación y lo que deben saber los huéspedes"
              required
            />
          </div>
        </div>
        <div className="input-group">
          <label>Agrega fotos de tu alojamiento</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {image && (
            <img src={image} alt="Vista previa" className="image-preview" />
          )}
        </div>

        <div className="input-group">
          <label htmlFor="address">Ubicación del alojamiento</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleInputChange}
            placeholder="Ingresa la dirección del alojamiento"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="price">Establece el precio del alojamiento</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Precio para el huésped (por noche)"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="extraPrice">Precio persona de más</label>
          <input
            type="text"
            id="extraPrice"
            value={extraPrice}
            onChange={(e) => setExtraPrice(e.target.value)}
            placeholder="Precio adicional por huésped extra"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="capacity">
            Cantidad de personas por noche en el alojamiento
          </label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Número máximo de huéspedes"
            required
          />
        </div>
        <fieldset>
          <legend>
            Cuéntale a los huéspedes todo lo que tu espacio tiene para ofrecer
          </legend>

          <label>
            <input
              type="checkbox"
              name="wifi"
              checked={amenities.wifi}
              onChange={handleCheckboxChange}
            />
            Wi-Fi
          </label>

          <label>
            <input
              type="checkbox"
              name="kitchen"
              checked={amenities.kitchen}
              onChange={handleCheckboxChange}
            />
            Cocina
          </label>

          <label>
            <input
              type="checkbox"
              name="tv"
              checked={amenities.tv}
              onChange={handleCheckboxChange}
            />
            Televisor
          </label>

          <label>
            <input
              type="checkbox"
              name="airConditioning"
              checked={amenities.airConditioning}
              onChange={handleCheckboxChange}
            />
            Aire Acondicionado
          </label>

          <label>
            <input
              type="checkbox"
              name="heating"
              checked={amenities.heating}
              onChange={handleCheckboxChange}
            />
            Calefacción
          </label>

          <label>
            <input
              type="checkbox"
              name="freeParking"
              checked={amenities.freeParking}
              onChange={handleCheckboxChange}
            />
            Estacionamiento gratuito
          </label>
        </fieldset>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default CreateAccommodationForm;
