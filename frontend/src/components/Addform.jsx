import React, { useState } from "react";
import { createPassword } from "../services/api";
import Iconremove from "../assets/icons/remove.svg";

const Addform = ({ authHeader, data, setData }) => {
  const initialState = {
    service: "",
    tags: [],
    username: "",
    password: "",
    confirmPassword: "",
    url: "",
    comments: "",
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
      alert("Passwords do not match.");
      return;
    }
    try {
      const { confirmPassword, ...dataToSend } = newPassword;
      const response = await createPassword(dataToSend, authHeader);
      console.log("Password created:", response);
      setData((data) => [...data, response.data]);
      setNewPassword(initialState);
    } catch (error) {
      console.error("Error while sending the createPassword request:", error);
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
            type="password"
            value={newPassword.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            name="confirmPassword"
            value={newPassword.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="tags">Tags</label>
          <input
            name="tags"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
            placeholder="Press Enter to add a tag"
          />
          <div className="tags-container">
            {newPassword.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <img
                  src={Iconremove}
                  className="remove-button"
                  type="button"
                  onClick={() => removeTag(index)}
                />
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
