import type ChatItemDTO from "./ChatItemDTO";

export default interface ChatMessageDTO {
    /** Unique identifier for the chat message */
    id: string;
    /** The role of the sender */
    role: 'USER' | 'ASSISTANT';
    /** List of chat items composing the message */
    content: ChatItemDTO[];
    /** The AI model used to generate the message */
    model?: string | null;
    /** The sequence number of the message in the conversation */
    messageIndex: number;
    /** Timestamp when the message was created */
    createdAt: string;
}
