import axios from "axios";
import {getAuth} from "firebase/auth";
import {app} from "../firebase.tsx";
import type {QuestionBank} from "@/model/QuestionBank.ts";
import type UserRegistrationDTO from "@/dtos/UserRegistrationDTO.ts";
import type QuestionBankCreationDTO from "@/dtos/QuestionBankCreationDTO.ts";
import type QuestionBankUpdateDTO from "@/dtos/QuestionBankUpdateDTO.ts";

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

export async function registerNewUser(payload: UserRegistrationDTO) {
  try {
    const response = await api.post('/users/register', payload);
    return response.data;
  } catch (error) {
  console.error('Failed to register new user:', error);
  throw error; // rethrow so the caller can handle it
  }
}

export async function createQuestionBank(payload: QuestionBankCreationDTO) {
  try {
    const response = await api.post('/banks', payload);
    return response.data;
  } catch (error) {
    console.log('Failed to create question bank:', error);
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

export async function getQuestionBank(bankId: string) {
  try {
    const response = await api.get(`/banks/single/${bankId}`);
    return response.data as QuestionBank;
  } catch (error) {
    console.error('Failed to fetch question bank:', error);
    throw error; // rethrow so the caller can handle it
  }
}

export async function updateQuestionBank(bankId: string, bankData: QuestionBankUpdateDTO) {
  try {
    const response = await api.put(`/banks/single/${bankId}`, bankData);
    return response.data as QuestionBank;
  } catch (error) {
    console.error('Failed to update question bank:', error);
    throw error; // rethrow so the caller can handle it
  }
}

export async function addQuestion() {
  
}

export async function logQuestionAnswer(questionId: string, answer: number) {
  try {
    const payload = {questionId: questionId, answer: answer}
    const response = await api.post('/questions/log', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to log user\'s answer:', error);
    throw error; // rethrow so the caller can handle it
  }
}