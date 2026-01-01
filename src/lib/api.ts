import axios from "axios";
import { getAuth } from "firebase/auth";
import { app } from "../firebase.tsx";
import type { QuestionBank } from "@/model/QuestionBank.ts";
import type { Question } from "@/model/Question.ts";
import type { Practice } from "@/model/Practice.ts";
import type UserRegistrationDTO from "@/dtos/UserRegistrationDTO.ts";
import type QuestionBankCreationDTO from "@/dtos/QuestionBankCreationDTO.ts";
import type QuestionBankUpdateDTO from "@/dtos/QuestionBankUpdateDTO.ts";
import type QuestionCreationDTO from "@/dtos/QuestionCreationDTO.ts";
import type QuestionUpdateDTO from "@/dtos/QuestionUpdateDTO.ts";
import type PracticeAnswerDTO from "@/dtos/PracticeAnswerDTO.ts";
import type Page from "@/dtos/Page.ts";
import type { UserStatisticDTO } from "@/dtos/UserStatisticDTO.ts";
import type PracticeAnswerResponseDTO from "@/dtos/PracticeAnswerResponseDTO.ts";
import type QuestionCommentCreationDTO from "@/dtos/QuestionCommentCreationDTO.ts";
import type QuestionComment from "@/model/Comment.ts";
import type QuestionCommentUpdateDTO from "@/dtos/QuestionCommentUpdateDTO.ts";
import type { DbFile } from "@/model/DbFile.ts";
import type AiResponseDTO from "@/dtos/AiResponseDTO";

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

// ===== USER ENDPOINTS (/users/) =====

export async function getUserInfo() {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error; // rethrow so the caller can handle it
  }
}

export async function getUserStatistic() {
  try {
    const response = await api.get('/users/me/statistic');
    return response.data as UserStatisticDTO;
  } catch (error) {
    console.error('Failed to fetch user statistic:', error);
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

// ===== QUESTION BANK ENDPOINTS (/banks/) =====

export async function createQuestionBank(payload: QuestionBankCreationDTO) {
  try {
    const response = await api.post('/banks', payload);
    return response.data;
  } catch (error) {
    console.log('Failed to create question bank:', error);
    throw error; // rethrow so the caller can handle it
  }
}

export async function getPublicQuestionBanks() {
  try {
    const response = await api.get('/banks/public');
    return response.data as QuestionBank[];
  } catch (error) {
    console.error('Failed to fetch public question banks:', error);
    throw error; // rethrow so the caller can handle it
  }
}

export async function getUserQuestionBanks() {
  try {
    const response = await api.get('/banks');
    return response.data as QuestionBank[];
  } catch (error) {
    console.error('Failed to fetch user question banks:', error);
    throw error; // rethrow so the caller can handle it
  }
}

export async function getQuestionBank(bankId: string) {
  try {
    const response = await api.get(`/banks/single/${bankId}`);
    const questionBank: QuestionBank = response.data;
    questionBank.tags.sort();
    return questionBank;
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

export async function deleteQuestionBank(bankId: string) {
  try {
    await api.delete(`/banks/single/${bankId}`);
  } catch (error) {
    console.error('Failed to delete question bank:', error);
    throw error; // rethrow so the caller can handle it
  }
}

export async function uploadFile(bankId: string, file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(`/banks/single/${bankId}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data as DbFile;
  } catch (error) {
    console.error('Failed to upload file:', error);
    throw error;
  }
}

export async function deleteFile(bankId: string, fileId: string) {
  try {
    await api.delete(`/banks/single/${bankId}/files/${fileId}`);
    return true;
  } catch (error) {
    console.error('Failed to delete file:', error);
    throw error;
  }
}

export async function viewFile(bankId: string, fileId: string) {
  try {
    const response = await api.get(`/banks/single/${bankId}/files/${fileId}/view`, {
      responseType: 'blob'
    });
    return response.data as Blob;
  } catch (error) {
    console.error('Failed to view file:', error);
    throw error;
  }
}

export async function downloadFile(bankId: string, fileId: string, knownFileName?: string) {
  try {
    const response = await api.get(`/banks/single/${bankId}/files/${fileId}/download`, {
      responseType: 'blob'
    });
    // Triggers download in the browser
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    // Try to get filename from content-disposition header
    const contentDisposition = response.headers['content-disposition'];
    let fileName = knownFileName || 'download';
    if (!knownFileName && contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
      if (fileNameMatch && fileNameMatch.length === 2)
        fileName = fileNameMatch[1];
    }

    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Failed to download file:', error);
    throw error;
  }
}

// ===== QUESTION ENDPOINTS (/questions/) =====

export async function overwriteAllQuestions(bankId: string, questionsData: QuestionCreationDTO[]) {
  try {
    const response = await api.post(`/questions/all/overwrite`, questionsData, {
      params: { bankId }
    });
    return response.data as Question[];
  } catch (error) {
    console.error('Failed to overwrite questions:', error);
    throw error;
  }
}

export async function addAllQuestions(bankId: string, questionsData: QuestionCreationDTO[]) {
  try {
    const response = await api.post(`/questions/all`, questionsData, {
      params: { bankId }
    });
    return response.data as Question[];
  } catch (error) {
    console.error('Failed to add questions:', error);
    throw error;
  }
}

export async function addQuestion(bankId: string, questionData: QuestionCreationDTO) {
  try {
    const response = await api.post(`/questions?bankId=${bankId}`, questionData);
    return response.data as Question;
  } catch (error) {
    console.error('Failed to create new question:', error);
    throw error; // rethrow so the caller can handle it
  }
}

export async function updateQuestion(questionId: string, questionData: QuestionUpdateDTO) {
  try {
    const response = await api.put(`/questions/single/${questionId}`, questionData);
    return response.data as Question;
  } catch (error) {
    console.error('Failed to update question:', error);
    throw error; // rethrow so the caller can handle it
  }
}

export async function deleteQuestion(questionId: string) {
  try {
    await api.delete(`/questions/single/${questionId}`);
    return true;
  } catch (error) {
    console.error('Failed to delete question:', error);
    throw error; // rethrow so the caller can handle it
  }
}

// ===== QUESTION COMMENTS ENDPOINTS (/questions/comments/) =====

export async function addComment(questionId: string, payload: QuestionCommentCreationDTO) {
  try {
    const response = await api.post(`/questions/comments`, payload, {
      params: {
        questionId: questionId
      }
    });
    return response.data as QuestionComment;
  } catch (error) {
    console.error('Failed to save new comment:', error);
    throw error;
  }
}

export async function updateComment(commentId: string, payload: QuestionCommentUpdateDTO) {
  try {
    const response = await api.put(`/questions/comments/single/${commentId}`, payload);
    return response.data as QuestionComment;
  } catch (error) {
    console.error('Failed to update comment:', error);
    throw error;
  }
}

// ===== PRACTICE ENDPOINTS (/practice/) =====

export async function startNewAnonymousPractice(bankId: string, size: number, shuffle: boolean) {
  try {
    const response = await api.get('/practice/new/anonymous', {
      params: {
        bankId,
        size,
        shuffle
      }
    });
    return response.data as Practice;
  } catch (error) {
    console.error('Failed to start new practice:', error);
    throw error;
  }
}

export async function startNewPractice(bankId: string, size: number, shuffle: boolean, revealAnswer: boolean, tags: string[]) {
  try {
    const response = await api.get('/practice/new', {
      params: {
        bankId,
        size,
        shuffle,
        revealAnswer,
        tags
      }
    });
    return response.data as { id: string };
  } catch (error) {
    console.error('Failed to start new practice:', error);
    throw error;
  }
}

export async function getUserPractice(pageSize?: number, pageIndex?: number, isClosed?: boolean) {
  try {
    const response = await api.get(`/practice/me`, {
      params: {
        size: pageSize,
        page: pageIndex,
        isClosed: isClosed,
      }
    });
    return response.data as Page<Practice>;
  } catch (error) {
    console.error('Failed to fetch practice:', error);
    throw error;
  }
}

export async function getPractice(practiceId: string) {
  try {
    const response = await api.get(`/practice/id/${practiceId}`);
    return response.data as Practice;
  } catch (error) {
    console.error('Failed to fetch practice:', error);
    throw error;
  }
}

export async function answer(practiceId: string, body: PracticeAnswerDTO) {
  try {
    const response = await api.post(`/practice/id/${practiceId}/answer`, body);
    if (response.data.correctAnswer) return response.data as PracticeAnswerResponseDTO;
    return null;
  } catch (error) {
    console.error('Failed to save user\'s answer:', error);
    throw error;
  }
}

export async function finishPractice(practiceId: string) {
  try {
    const response = await api.post(`/practice/id/${practiceId}/finish`);
    return response.data as Practice;
  } catch (error) {
    console.error('Failed to finish practice session:', error);
    throw error;
  }
}

// ===== AI ENDPOINTS (/ai/) =====

export async function parseAiFile(fileId: string, onResponse: (data: AiResponseDTO) => void) {
  let lastSeenLength = 0;
  let buffer = "";

  await api.post(`/ai/parse/${fileId}`, {}, {
    responseType: 'text',
    onDownloadProgress: (progressEvent) => {
      const fullResponse = progressEvent.event.target.responseText;
      const newChunk = fullResponse.slice(lastSeenLength);
      lastSeenLength = fullResponse.length;
      buffer += newChunk;

      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        let data = line.trim();
        if (!data.startsWith('data:')) continue;
        data = data.replace('data:', '').trim();
        if (data.length === 0) continue;
        if (data === '[DONE]') return;
        try {
          const parsedData: AiResponseDTO = JSON.parse(data);
          onResponse(parsedData);
        } catch (error) {
          console.error('Error parsing SSE data:', error);
        }
      }
    }
  });
}