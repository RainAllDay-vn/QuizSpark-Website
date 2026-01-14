import axios from "axios";
import { getAuth } from "firebase/auth";
import { app } from "../firebase.tsx";
import { userCache } from "@/lib/userCache.ts";
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
import type Tag from "@/model/Tag.ts";
import type { TagCreationDTO } from "@/dtos/TagCreationDTO.ts";
import type { TagUpdateDTO } from "@/dtos/TagUpdateDTO.ts";
import type ChatRequestDTO from "@/dtos/ChatRequestDTO.ts";
import type ChatResponseDTO from "@/dtos/ChatResponseDTO.ts";
import type ChatSessionDTO from "@/dtos/ChatSessionDTO.ts";
import type ChatMessageDTO from "@/dtos/ChatMessageDTO.ts";
import type ChatModelDTO from "@/dtos/ChatModelDTO.ts";
import type ClassroomCreateDTO from "@/dtos/ClassroomCreateDTO.ts";
import type ClassroomResponseDTO from "@/dtos/ClassroomResponseDTO.ts";
import type UserDTO from "@/dtos/UserDTO.ts";

const BASE_URL = import.meta.env.VITE_BACKEND_API || "/api/v1";
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Mark cache as dirty on any error (none-okay status code)
    userCache.markDirty();
    return Promise.reject(error);
  }
);

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

export async function searchUsers(query: string) {
  const response = await api.get('/users', {
    params: { query }
  });
  return response.data as UserDTO[];
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
    console.error('Failed to unassign file:', error);
    throw error;
  }
}

export async function unassignFileFromBank(bankId: string, fileId: string) {
  return deleteFile(bankId, fileId);
}

export async function assignFileToBank(bankId: string, fileId: string) {
  try {
    const response = await api.post(`/banks/single/${bankId}/files/${fileId}`);
    return response.data as DbFile;
  } catch (error) {
    console.error('Failed to assign file to bank:', error);
    throw error;
  }
}

// ===== INDEPENDENT FILE ENDPOINTS (/files/) =====

export async function uploadFileIndependent(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(`/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data as DbFile;
  } catch (error) {
    console.error('Failed to upload file independently:', error);
    throw error;
  }
}

export async function getUserFiles() {
  try {
    const response = await api.get('/files');
    return response.data as DbFile[];
  } catch (error) {
    console.error('Failed to fetch user files:', error);
    throw error;
  }
}

export async function deleteFilePermanent(fileId: string) {
  try {
    await api.delete(`/files/${fileId}`);
    return true;
  } catch (error) {
    console.error('Failed to delete file permanently:', error);
    throw error;
  }
}

export async function viewFile(fileId: string) {
  try {
    const response = await api.get(`/files/${fileId}/view`, {
      responseType: 'blob'
    });
    return response.data as Blob;
  } catch (error) {
    console.error('Failed to view file:', error);
    throw error;
  }
}

export async function updateFileContent(fileId: string, content: string) {
  try {
    const response = await api.put(`/files/${fileId}`, content, {
      headers: {
        'Content-Type': 'text/plain'
      }
    });
    return response.data as DbFile;
  } catch (error) {
    console.error('Failed to update file content:', error);
    throw error;
  }
}

export async function downloadFile(fileId: string, knownFileName?: string) {
  try {
    const response = await api.get(`/files/${fileId}/download`, {
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

// ===== TAG ENDPOINTS (/tags/) =====

export async function addTag(bankId: string, payload: TagCreationDTO) {
  try {
    const response = await api.post(`/tags/bank/${bankId}`, payload);
    return response.data as Tag;
  } catch (error) {
    console.error('Failed to add tag:', error);
    throw error;
  }
}

export async function updateTag(tagId: string, payload: TagUpdateDTO) {
  try {
    const response = await api.put(`/tags/single/${tagId}`, payload);
    return response.data as Tag;
  } catch (error) {
    console.error('Failed to update tag:', error);
    throw error;
  }
}

export async function deleteTag(tagId: string) {
  try {
    await api.delete(`/tags/single/${tagId}`);
    return true;
  } catch (error) {
    console.error('Failed to delete tag:', error);
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

export async function duplicatePractice(practiceId: string) {
  try {
    const response = await api.post(`/practice/id/${practiceId}/duplicate`);
    return response.data as { id: string };
  } catch (error) {
    console.error('Failed to duplicate practice session:', error);
    throw error;
  }
}

// ===== AI ENDPOINTS (/ai/) =====

export async function parseAiFile(fileId: string, onResponse: (data: AiResponseDTO) => void) {
  let lastSeenLength = 0;
  let buffer = "";

  await api.post(`/ai/parse/file/${fileId}`, {}, {
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

export async function extractFile(fileId: string, onResponse: (data: AiResponseDTO) => void) {
  let lastSeenLength = 0;
  let buffer = "";

  await api.post(`/ai/extract/file/${fileId}`, {}, {
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
        if (data === '[DONE]') {
            console.log("Stream finished");
            return;
        }
        try {
          const parsedData = JSON.parse(data);
          onResponse(parsedData);
        } catch (error) {
          console.error('Error parsing SSE data:', error);
        }
      }
    }
  });
}

// ===== CHAT ENDPOINTS (/chat/) =====

export async function streamChat(request: ChatRequestDTO, onChunk: (data: ChatResponseDTO) => void) {
  let lastSeenLength = 0;
  let buffer = "";

  await api.post(`/chat/stream`, request, {
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
        try {
          const parsedData: ChatResponseDTO = JSON.parse(data);
          onChunk(parsedData);
        } catch (error) {
          console.error('Error parsing chat SSE data:', error);
        }
      }
    }
  });
}

export async function deleteChatSession(sessionId: string) {
  try {
    await api.delete(`/chat/sessions/${sessionId}`);
    return true;
  } catch (error) {
    console.error('Failed to delete chat session:', error);
    throw error;
  }
}

export async function getChatSessions() {
  try {
    const response = await api.get('/chat/sessions');
    return response.data as ChatSessionDTO[];
  } catch (error) {
    console.error('Failed to fetch chat sessions:', error);
    throw error;
  }
}

export async function getSessionMessages(sessionId: string) {
  try {
    const response = await api.get(`/chat/sessions/${sessionId}/messages`);
    return response.data as ChatMessageDTO[];
  } catch (error) {
    console.error('Failed to fetch session messages:', error);
    throw error;
  }
}

export async function getChatModels() {
  try {
    const response = await api.get('/chat/models');
    return response.data as ChatModelDTO[];
  } catch (error) {
    console.error('Failed to fetch chat models:', error);
    throw error;
  }
}


export async function generateAdaptiveQuestions(bankId: string, onResponse: (data: AiResponseDTO) => void) {
  let lastSeenLength = 0;
  let buffer = "";

  await api.post(`/ai/generate/bank/${bankId}`, {}, {
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

// ===== CLASSROOM ENDPOINTS (/classrooms/) =====

export async function createClassroom(payload: ClassroomCreateDTO) {
  try {
    const response = await api.post('/classrooms', payload);
    return response.data as ClassroomResponseDTO;
  } catch (error) {
    console.error('Failed to create classroom:', error);
    throw error;
  }
}

export async function getUserClassrooms() {
  try {
    const response = await api.get('/classrooms');
    return response.data as ClassroomResponseDTO[];
  } catch (error) {
    console.error('Failed to fetch user classrooms:', error);
    throw error;
  }
}

export async function getClassroom(classroomId: string) {
  try {
    const response = await api.get(`/classrooms/${classroomId}`);
    return response.data as ClassroomResponseDTO;
  } catch (error) {
    console.error('Failed to fetch classroom:', error);
    throw error;
  }
}

export async function inviteToClassroom(classroomId: string, username: string) {
  try {
    const response = await api.post(`/classrooms/${classroomId}/invite`, null, {
      params: { username }
    });
    return response.data as ClassroomResponseDTO;
  } catch (error) {
    console.error('Failed to invite user to classroom:', error);
    throw error;
  }
}

export async function removeMemberFromClassroom(classroomId: string, userId: string) {
  try {
    const response = await api.delete(`/classrooms/${classroomId}/members/${userId}`);
    return response.data as ClassroomResponseDTO;
  } catch (error) {
    console.error('Failed to remove member from classroom:', error);
    throw error;
  }
}

export async function joinClassroomByCode(joinCode: string) {
  try {
    const response = await api.post(`/classrooms/join`, null, {
      params: { joinCode }
    });
    return response.data as ClassroomResponseDTO;
  } catch (error) {
    console.error('Failed to join classroom by code:', error);
    throw error;
  }
}
