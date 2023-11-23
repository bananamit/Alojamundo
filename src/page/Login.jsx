import { useState } from "react";
import Logo from "../assets/logo.png";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { mutate: login, isLoading, error } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem(
            "user",
            JSON.stringify({ id: data.id, email: data.email })
          );
          localStorage.setItem("token", data.token);
          navigate("/home"); // Asegúrate de que '/home' sea la ruta correcta
        },
      }
    );
  };

  if (error) {
    return <p>Error al iniciar sesión: {error.message}</p>;
  }

  return (
    <div className="login-container">
      <div className="logo">
        <img src={Logo} alt="AlojaMundo Logo" />
      </div>
      <form onSubmit={handleLogin} className="form">
        <div className="input-group">
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        )}
      </form>
      <div className="register">
        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
