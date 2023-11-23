import { useState } from "react";
import "./Register.css";
import Logo from "../assets/logo.png";
import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [telefono, setTelefono] = useState("");

  const navigate = useNavigate();
  const { mutate: register, isLoading, error } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(
      {
        nombre,
        apellido,
        email,
        password, // Asegúrate de manejar la confirmación de la contraseña antes de enviar
        pais,
        ciudad,
        telefono,
      },
      {
        onSuccess: (data) => {
          // Almacenar la información del usuario y el token
          // Puedes usar localStorage, sessionStorage, o un estado global (como Context)
          localStorage.setItem(
            "user",
            JSON.stringify({ id: data.id, nombre: data.nombre })
          );
          localStorage.setItem("token", data.token);

          // Redirigir al usuario a la página de inicio
          navigate("/home"); // Asegúrate de que '/home' sea la ruta correcta
        },
      }
    );
  };

  if (error) {
    return <p>Ha ocurrido un error: {error}</p>;
  }

  return (
    <div className="register-container">
      <div className="logo">
        <img src={Logo} alt="AlojaMundo Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="pais">País</label>
            <input
              type="text"
              id="pais"
              name="pais"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="ciudad">Ciudad</label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
        </div>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <button type="submit" className="register-button">
            Regístrate
          </button>
        )}
      </form>
      <div className="login">
        <p>
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesion</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
