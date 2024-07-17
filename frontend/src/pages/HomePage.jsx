import React from "react";
import Navigation from "../components/Navigation";

const HomePage = () => {
  return (
    <div className="home-page">
      <Navigation />
      <div className="hero">
        <h1 className="hero__title">Password Manager</h1>
      </div>
    </div>
  );
};

export default HomePage;
