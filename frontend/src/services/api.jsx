import axios from "axios";

const api = axios.create({
  baseURL: `http://${process.env.IP}:${process.env.PORT}`,
});

// POST
export const login = (username, password) =>
  api.post("/auth/login", { username, password });
export const register = (username, email, password) =>
  api.post("/auth/register", { username, email, password });
export const createPassword = (newPassword, token) =>
  api.post("/password", newPassword, {
    headers: { Authorization: `${token}` },
  });
export const copyPassword = (passwordId, token) =>
  api.post(
    `/password/${passwordId}/copy`,
    {},
    {
      headers: { Authorization: `${token}` },
    }
  );
export const deletePassword = (passwordId, token) =>
  api.delete(`/password/${passwordId}`, {
    headers: { Authorization: `${token}` },
  });

// GET
export const getPasswords = (token) =>
  api.get("/password", { headers: { Authorization: `${token}` } });

export default api;
