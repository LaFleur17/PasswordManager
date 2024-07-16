import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.32:3000", // EDIT FAST
});

export const login = (username, password) =>
  api.post("/auth/login", { username, password });
export const register = (username, email, password) =>
  api.post("/auth/register", { username, email, password });
export const createPassword = (data, token) =>
  api.post("/password", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getPasswords = (token) =>
  api.get("/password", { headers: { Authorization: `Bearer ${token}` } });

export default api;
