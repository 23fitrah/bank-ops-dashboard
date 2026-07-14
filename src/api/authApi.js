import axiosInstance from "./axiosInstance";

export const loginUser = (credentials) =>
  axiosInstance.post("/auth/login", credentials);

export const registerUser = (data) =>
  axiosInstance.post("/auth/register", data);

export const logoutUser = () =>
  axiosInstance.post("/auth/logout");

export const getProfile = () =>
  axiosInstance.get("/auth/me");
