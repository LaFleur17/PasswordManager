import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AccessDashboard from "../pages/modals/AccessDashboard";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useContext(AuthContext);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };
  return (
    <div className="nav">
      <ul className="nav__links">
        <li>
          <NavLink
            to={"/"}
            className={(nav) =>
              nav.isActive ? "nav__active-link" : "nav__link"
            }
          >
            Homepage{" "}
          </NavLink>
        </li>
        {!token && (
          <li>
            <Link
              className="nav__link"
              to={"/access"}
              onClick={handleOpenModal}
            >
              Log in
            </Link>
          </li>
        )}
        {}
        {token && (
          <li>
            <NavLink
              to={"/dashboard"}
              className={(nav) =>
                nav.isActive ? "nav__active-link" : "nav__link"
              }
            >
              Go to Dashboard →
            </NavLink>
          </li>
        )}
        {token && (
          <li>
            <NavLink onClick={handleLogout} to={"/"} className="nav__link">
              Log out Ф
            </NavLink>
          </li>
        )}
      </ul>
      {isModalOpen && (
        <AccessDashboard closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
export default Navigation;
