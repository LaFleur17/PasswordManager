import React from "react";
import Iconcopy from "../assets/icons/copy.svg";
import { copyPassword } from "../services/api";

// Correction ici: Utilisation de props dans un composant fonctionnel
const Copypassword = ({ authHeader, passwordId }) => {
  const copyPasswordHandler = async () => {
    try {
      const password = await copyPassword(passwordId, authHeader);
      console.log("copyPasswords success:", password);
    } catch (error) {
      console.error("copyPasswords failed:", error);
    }
  };
  return (
    <div className="copy-button">
      <img
        src={Iconcopy}
        className="copy-icon"
        alt="Copy password"
        onClick={copyPasswordHandler}
      />
    </div>
  );
};

export default Copypassword;
