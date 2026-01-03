export default interface ChatMessageDTO {
    id: string;
    role: 'USER' | 'ASSISTANT';
    content: string;
    model?: string | null;
    messageIndex: number;
    fileIds?: string[];  // For ID references (from backend)
    createdAt: string;
}
