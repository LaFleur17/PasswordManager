import React, { useState } from "react";
import Login from "../../components/Login";
import Register from "../../components/Register";

const AccessDashboard = ({ closeModal }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="access-dashboard">
      <button className="modal-close" onClick={closeModal}>
        X
      </button>
      {isLoginView ? (
        <>
          <Login closeModal={closeModal} />
          <p>
            Pas de compte ? <button onClick={toggleView}>S'inscrire</button>
          </p>
        </>
      ) : (
        <>
          <Register />
          <p>
            Vous avez déjà un compte ?{" "}
            <button onClick={toggleView}>Se connecter</button>
          </p>
        </>
      )}
    </div>
  );
};

export default AccessDashboard;
