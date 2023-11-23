import "./Nav.css"; // Asegúrate de tener un archivo CSS con los estilos necesarios
import Logo from "../assets/logo.png"; // Asegúrate de que la ruta del import sea correcta
import ProfileImage from "../assets/profile-image.png"; // Reemplaza con la ruta de tu imagen de perfil
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  const reditectAlojamiento = () => {
    navigate("/create-accomodation");
  };

  const reditectHome = () => {
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <img
        onClick={() => reditectHome()}
        src={Logo}
        alt="AlojaMundo Logo"
        className="navbar-logo"
      />
      <div className="navbar-links">
        <button className="navbar-button" onClick={() => reditectAlojamiento()}>
          Registra tu alojamiento
        </button>
        <div className="navbar-profile">
          <img
            src={ProfileImage}
            alt="Perfil"
            className="navbar-profile-icon"
          />
          <span>Perfil</span>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
