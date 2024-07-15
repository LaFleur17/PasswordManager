import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login as loginService } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await loginService(username, password);
      login(token);
      closeModal();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.status === 401) {
        setError("Échec de la connexion : Identifiants incorrects.");
      } else {
        setError("Échec de la connexion : Veuillez réessayer plus tard.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login">
      <div className="form-fields">
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="cta-button">
        Login
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Login;
