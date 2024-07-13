import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            token ? (
              <HomePage token={token} />
            ) : (
              <LoginPage setToken={setToken} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
