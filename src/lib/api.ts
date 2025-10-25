import axios from "axios";
import {getAuth} from "firebase/auth";
import {app} from "../firebase.tsx";

const BASE_URL = import.meta.env.VITE_BACKEND_API || "http://localhost:8080/api/v1";
const auth = getAuth(app);

export const api = axios.create({
  baseURL: BASE_URL
});

// Add a request interceptor to add user's id Token every time a request is made
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user && config.headers) {
    const token = await user.getIdToken();
    config.headers.set?.("Authorization", `Bearer ${token}`);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export function updateAuth(newToken: string | undefined) {
  if (newToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  } else {
    delete api.defaults.headers.common["Authorization"]; // remove header if token is empty
  }
}