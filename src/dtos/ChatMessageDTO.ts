export default interface ChatMessageDTO {
    id: string;
    role: 'USER' | 'ASSISTANT';
    content: string;
    model?: string | null;
    messageIndex: number;
    fileId?: string | null;
    createdAt: string;
}
