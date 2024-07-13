// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import PasswordList from "../components/PasswordList";
import PasswordForm from "../components/PasswordForm";

const HomePage = ({ token }) => {
  const [passwords, setPasswords] = useState("");
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const { data } = await getPasswords(token);
        setPasswords(data);
      } catch (error) {
        console.error("Failed to fetch passwords:", error);
      }
    };
    fetchPasswords();
  }, [token]);

  const addPassword = (newPassword) => {
    setPasswords((prevPasswords) => [...prevPasswords, newPassword]);
  };
  return (
    <div>
      <h1>Password Manager</h1>
      <PasswordForm token={token} addPassword={addPassword} />
      <PasswordList token={token} passwords={passwords} />
    </div>
  );
};

export default HomePage;
