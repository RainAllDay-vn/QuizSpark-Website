export default interface ChatRequestDTO {
    message: string;
    sessionId?: string;
    model?: string;
    fileId?: string;
    index?: number;
    tts?: boolean;
}
