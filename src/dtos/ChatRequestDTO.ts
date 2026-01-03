import type ChatFileDTO from './ChatFileDTO';

export default interface ChatRequestDTO {
    message: string;
    sessionId?: string;
    model?: string;
    files?: ChatFileDTO[];
    index?: number;
    tts?: boolean;
}
