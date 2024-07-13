// src/pages/LoginPage.js
import React, { useState } from "react";
import Login from "../components/Login";

const LoginPage = ({ setToken }) => {
  return (
    <div>
      <h1>Login</h1>
      <Login setToken={setToken} />
    </div>
  );
};

export default LoginPage;
