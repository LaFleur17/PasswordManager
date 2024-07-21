import React, { useState } from "react";
import { createPassword } from "../services/api";

const Addform = ({ authHeader, data, setData }) => {
  const initialState = {
    service: "",
    tags: [],
    username: "",
    password: "",
    confirmPassword: "",
    url: "",
    notes: "",
    sharedWith: [],
  };

  const [newPassword, setNewPassword] = useState(initialState);
  const [tagInput, setTagInput] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleTagInputKeyDown = (event) => {
    if (event.key === "Enter" && tagInput) {
      event.preventDefault();
      setNewPassword((prevState) => ({
        ...prevState,
        tags: [...prevState.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setNewPassword((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword.password !== newPassword.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const response = await createPassword(newPassword, authHeader);
      console.log("Password created:", response);
      setData((data) => [...data, response.data]);
      setNewPassword(initialState);
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la requête createPassword:",
        error
      );
    }
  };

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit} className="form-fields">
        <div className="form-field">
          <label htmlFor="service">Service*</label>
          <input
            name="service"
            value={newPassword.service}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="username">Username*</label>
          <input
            name="username"
            value={newPassword.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password*</label>
          <input
            name="password"
            value={newPassword.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input name="confirmPassword" onChange={handleChange} required />
        </div>

        <div className="form-field">
          <label htmlFor="tags">Tags</label>
          <input
            name="tags"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
          />
          <div className="tags-container">
            {newPassword.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button type="button" onClick={() => removeTag(index)}>
                  x
                </button>
              </span>
            ))}
          </div>
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

export default Addform;
