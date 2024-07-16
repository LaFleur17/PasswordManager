import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import PasswordManager from "../components/Passwordmanager";

const DashboardPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <div className="dashboard">
      <Navigation />
      <div className="title-section">
        <h1 className="title-section__title">Dashboard</h1>
        <p>Welcome! You have successfully logged in.</p>
      </div>
      <PasswordManager />
    </div>
  );
};

export default DashboardPage;
