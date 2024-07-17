import React from "react";
import Navigation from "../components/Navigation";
import PasswordManager from "../components/Passwordsmanager";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const DashboardPage = () => {
  const authHeader = useAuthHeader();
  return (
    <div className="dashboard">
      <Navigation />
      <div className="title-section">
        <h1 className="title-section__title">Dashboard</h1>
        <p>Welcome! You have successfully logged in.</p>
      </div>
      <PasswordManager authHeader={authHeader} />
    </div>
  );
};

export default DashboardPage;
