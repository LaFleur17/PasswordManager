import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.32:3000", // EDIT FAST
});

export const login = (username, password) =>
  api.post("/auth/login", { username, password });
export const register = (username, email, password) =>
  api.post("/auth/register", { username, email, password });
export const createPassword = (newPassword, token) =>
  api.post("/password", newPassword, {
    headers: { Authorization: `${token}` },
  });
export const getPasswords = (token) =>
  api.get("/password", { headers: { Authorization: `${token}` } });

export default api;
