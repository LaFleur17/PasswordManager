import React from "react";
import Iconbin from "../assets/icons/bin.svg";
import { deletePassword } from "../services/api";

const Deletepassword = ({ authHeader, passwordId, data, setData }) => {
  const deletePasswordHandler = async () => {
    try {
      await deletePassword(passwordId, authHeader);
      console.log("deletePassword success");
      const updatedData = data.filter(
        (password) => password._id !== passwordId
      );
      setData(updatedData);
    } catch (error) {
      console.error("deletePassword failed:", error);
    }
  };
  return (
    <div className="delete-button">
      <img
        src={Iconbin}
        className="delete-icon"
        alt="Delete password"
        onClick={deletePasswordHandler}
      />
    </div>
  );
};

export default Deletepassword;
