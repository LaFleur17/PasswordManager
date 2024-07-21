import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import AccessDashboard from "../pages/modals/AccessDashboard";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const signOut = useSignOut();

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
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
        <li>
          <Link className="nav__link" to={"/access"} onClick={handleOpenModal}>
            Log in
          </Link>
        </li>
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
        <li>
          <NavLink onClick={() => signOut()} to={"/"} className="nav__link">
            Log out Ф
          </NavLink>
        </li>
      </ul>
      {isModalOpen && (
        <AccessDashboard closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
export default Navigation;
