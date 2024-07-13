// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const login = (username, password) =>
  api.post("/auth/login", { username, password });
export const register = (username, password) =>
  api.post("/auth/register", { username, password });
export const createPassword = (data, token) =>
  api.post("/password", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getPasswords = (token) =>
  api.get("/password", { headers: { Authorization: `Bearer ${token}` } });

export default api;
