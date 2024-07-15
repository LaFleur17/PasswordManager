import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const DashboardPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!token) {
    navigate("/");
    return null;
  }

  return (
    <div className="dashboard">
      <Navigation />
      <div className="title-section">
        <h1 className="title-section__title">Dashboard</h1>
        <p>Welcome! You have successfully logged in.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
