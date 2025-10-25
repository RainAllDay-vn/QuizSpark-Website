import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API || "http://localhost:8080/api/v1";

export const api = axios.create({
  baseURL: BASE_URL
});

export function updateAuth(newToken: string | undefined) {
  if (newToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  } else {
    delete api.defaults.headers.common["Authorization"]; // remove header if token is empty
  }
}