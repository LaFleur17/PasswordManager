import React, { useState } from "react";
import { createPassword } from "../services/api";

const PasswordCreator = ({ authHeader, data, setData }) => {
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
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la requête createPassword:",
        error
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="siteName">Site Name*</label>
      <input
        name="siteName"
        value={newPassword.siteName}
        onChange={handleChange}
      />
      <label htmlFor="customName">Custom Name</label>
      <input
        name="customName"
        value={newPassword.customName}
        onChange={handleChange}
      />
      <label htmlFor="username">Username*</label>
      <input
        name="username"
        value={newPassword.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password*</label>
      <input
        name="password"
        value={newPassword.password}
        onChange={handleChange}
      />
      <label htmlFor="url">URL</label>
      <input name="url" value={newPassword.url} onChange={handleChange} />
      <label htmlFor="comments">Comments</label>
      <input
        name="comments"
        value={newPassword.comments}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PasswordCreator;
