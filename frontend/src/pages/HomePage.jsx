import React, { useState } from "react";
import Navigation from "../components/Navigation";
import AccessDashboard from "./modals/AccessDashboard";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="home-page">
      <Navigation />
      <div className="hero">
        <h1 className="hero__title">Password Manager</h1>
        <button className="cta-button" onClick={() => setIsModalOpen(true)}>
          Go to Dashboard
        </button>
      </div>
      {isModalOpen && (
        <AccessDashboard closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
