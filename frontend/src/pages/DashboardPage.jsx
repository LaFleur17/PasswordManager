import React, { useState } from "react";
import Navigation from "../components/Navigation";
import PasswordManager from "../components/Passwordsmanager";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { getPasswords } from "../services/api";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const authHeader = useAuthHeader();

  const showPasswords = async () => {
    try {
      const passwords = await getPasswords(authHeader);
      setData(passwords.data);
    } catch (error) {
      console.error("showPasswords failed:", error);
    }
  };
  return (
    <div className="dashboard">
      <Navigation />
      <div className="title-section">
        <h1 className="title-section__title">Dashboard</h1>
        <p>Welcome! You have successfully logged in.</p>
      </div>
      <PasswordManager
        data={data}
        setData={setData}
        authHeader={authHeader}
        showPasswords={showPasswords}
      />
    </div>
  );
};

export default DashboardPage;
