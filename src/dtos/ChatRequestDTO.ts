import type ChatItemDTO from './ChatItemDTO';

export default interface ChatRequestDTO {
    sessionId?: string;
    model?: string;
    index?: number;
    tts?: boolean;
    items: ChatItemDTO[];
}
