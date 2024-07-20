import React, { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Le mot de passe doit contenir au moins 12 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
      return;
    }
    try {
      await register(username, email, password);
      setError(
        "Your account has been created successfully. You can now login."
      );
    } catch (error) {
      if (error.response) {
        console.error("Erreur de réponse du serveur :", error.response.data);
        setError(`Error : ${error.response.data.message}`);
      } else if (error.request) {
        console.error(
          "La requête a été faite mais aucune réponse n'a été reçue",
          error.request
        );
        setError("Error : Server did not respond.");
      } else {
        console.error(
          "Erreur lors de la configuration de la requête :",
          error.message
        );
        setError("Error : Something went wrong.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register">
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
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="form-field">
          {" "}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="button-section">
        {error && <p>{error}</p>}{" "}
        <button className="cta-button" type="submit">
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
