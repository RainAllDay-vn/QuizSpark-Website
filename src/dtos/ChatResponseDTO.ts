export default interface ChatResponseDTO {
    chunk?: string;
    sessionId?: string;
    role?: 'USER' | 'ASSISTANT';
    status: 'data' | 'finish' | 'error';
}
