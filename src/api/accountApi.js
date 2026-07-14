// Nama file tetap userApi.js sesuai struktur project,
// tapi entitas yang dipakai di CRUD ini adalah "Products".
// Tinggal ganti endpoint "/products" kalau mau dipakai untuk entitas lain.
import axiosInstance from "./axiosInstance";

export const getProducts = () => axiosInstance.get("/products");
export const getProductById = (id) => axiosInstance.get(`/products/${id}`);
export const createProduct = (data) => axiosInstance.post("/products", data);
export const updateProduct = (id, data) => axiosInstance.put(`/products/${id}`, data);
export const deleteProduct = (id) => axiosInstance.delete(`/products/${id}`);
