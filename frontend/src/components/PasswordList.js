import React, { useEffect, useState } from "react";
import { getPasswords } from "../services/api";

const PasswordList = ({ passwords: initialPasswords, token }) => {
  const [passwords, setPasswords] = useState(initialPasswords);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const { data } = await getPasswords(token);
        if (Array.isArray(data)) {
          setPasswords(data);
        } else {
          console.error("Expected an array of passwords, but got:", data);
          setPasswords([]); // Réinitialiser passwords avec un tableau vide si data n'est pas un tableau
        }
      } catch (error) {
        console.error("Failed to fetch passwords:", error);
        setPasswords([]); // Réinitialiser passwords avec un tableau vide en cas d'erreur
      }
    };
    fetchPasswords();
  }, [token]);

  // Vérifiez si passwords est un tableau avant de le mapper
  if (!Array.isArray(passwords)) {
    return <p>No passwords to display.</p>; // or handle loading state/error state appropriately
  }

  return (
    <div>
      {passwords.map((password) => (
        <div key={password._id}>
          <h3>{password.siteName}</h3>
          <p>{password.username}</p>
        </div>
      ))}
    </div>
  );
};

export default PasswordList;
