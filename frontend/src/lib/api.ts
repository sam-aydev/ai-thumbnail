import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response && error.response.status === 401) {
      if (!window.location.pathname.includes("/auth")) {
        console.warn("Session expired");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  },
);
export interface User {
  _id: string;
  username: string;
  email: string;
  credits: number;
}

export interface Thumbnail {
  _id: string;
  title: string;
  style: string;
  imageUrl: string;
  createdAt: string;
}
