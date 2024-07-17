import React, { useState } from "react";
import { createPassword } from "../services/api";

const PasswordCreator = ({ authHeader, data, setData, isModalOpen }) => {
  const initialState = {
    siteName: "",
    customName: "",
    username: "",
    password: "",
    url: "",
    comments: "",
  };

  const [newPassword, setNewPassword] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createPassword(newPassword, authHeader);
      console.log("Password created:", response);
      setData((data) => [...data, response.data]); // Ajoute la réponse à data
      setNewPassword(initialState); // Réinitialise les champs du formulaire
      isModalOpen(false);
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la requête createPassword:",
        error
      );
    }
  };

  return (
    <div className="passwords-creator">
      <form onSubmit={handleSubmit} className="form-fields">
        <div className="form-field">
          <label htmlFor="siteName">Site Name*</label>
          <input
            name="siteName"
            value={newPassword.siteName}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="customName">Custom Name</label>
          <input
            name="customName"
            value={newPassword.customName}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="username">Username*</label>
          <input
            name="username"
            value={newPassword.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password*</label>
          <input
            name="password"
            value={newPassword.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="url">URL</label>
          <input name="url" value={newPassword.url} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="comments">Comments</label>
          <input
            name="comments"
            value={newPassword.comments}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="cta-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordCreator;
