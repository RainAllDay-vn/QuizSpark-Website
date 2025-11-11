import axios from "axios";
import {getAuth} from "firebase/auth";
import {app} from "../firebase.tsx";
import type {QuestionBank} from "@/model/QuestionBank.ts";
import type {Question} from "@/model/Question.ts";

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

export async function getUserInfo() {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error; // rethrow so the caller can handle it
  }
}

export async function getPublicQuestionBank() {
  try {
    const response = await api.get('/banks/public');
    return response.data as QuestionBank[];
  } catch (error) {
    console.error('Failed to fetch public question banks:', error);
    throw error; // rethrow so the caller can handle it
  }
}

export async function getQuestions(bankId: string | undefined) {
  try {
    if (!bankId) {
      console.error('No bankId found');
      return [];
    }
    const response = await api.get('/questions', {params: {bankId}});
    return response.data as Question[];
  } catch (error) {
    console.error('Failed to fetch questions from bank:', error);
    throw error; // rethrow so the caller can handle it
  }
}