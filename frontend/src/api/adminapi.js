import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

/* ===== Auth ===== */
export const loginAdmin = (data) => API.post("/login", data).then((r) => r.data);
export const logoutAdmin = () => API.post("/logout").then((r) => r.data);
export const checkAdminAuth = () => API.get("/checkauth").then((r) => r.data);

/* ===== Overview ===== */
export const getOverview = () => API.get("/overview").then((r) => r.data);

/* ===== Users ===== */
export const getAllUsers = (params) => API.get("/users", { params }).then((r) => r.data);
export const getUserById = (id) => API.get(`/users/${id}`).then((r) => r.data);
export const deleteUser = (id) => API.delete(`/users/${id}`).then((r) => r.data);

/* ===== Wellness ===== */
export const getAllWellness = (params) => API.get("/wellness", { params }).then((r) => r.data);
export const getWellnessById = (id) => API.get(`/wellness/${id}`).then((r) => r.data);
export const updateWellness = (id, data) => API.put(`/wellness/${id}`, data).then((r) => r.data);
export const deleteWellness = (id) => API.delete(`/wellness/${id}`).then((r) => r.data);

/* ===== Shloks ===== */
export const getAllShloks = (params) => API.get("/shloks", { params }).then((r) => r.data);
export const getShlokById = (id) => API.get(`/shloks/${id}`).then((r) => r.data);
export const updateShlok = (id, data) => API.put(`/shloks/${id}`, data).then((r) => r.data);
export const deleteShlok = (id) => API.delete(`/shloks/${id}`).then((r) => r.data);