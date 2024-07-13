// src/components/PasswordForm.js
import React, { useState } from "react";
import { createPassword } from "../services/api";

const PasswordForm = ({ token, addPassword }) => {
  const [siteName, setSiteName] = useState("");
  const [customName, setCustomName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [url, setUrl] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPassword(
        { siteName, customName, username, password, url, comments },
        token
      );
      addPassword(data);
      alert("Password created successfully");
    } catch (error) {
      console.error("Failed to create password:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Site Name"
        value={siteName}
        onChange={(e) => setSiteName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Custom Name"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
      <button type="submit">Save Password</button>
    </form>
  );
};

export default PasswordForm;
