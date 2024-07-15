import React, { useState } from "react";
import Navigation from "../components/Navigation";
import AccessDashboard from "./modals/AccessDashboard";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="home-page">
      <Navigation />
      <div className="hero">
        <h1 className="hero__title">PASSWORD MANAGER</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button onClick={() => setIsModalOpen(true)}>Access Dashboard</button>
      </div>
      {isModalOpen && (
        <AccessDashboard closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
