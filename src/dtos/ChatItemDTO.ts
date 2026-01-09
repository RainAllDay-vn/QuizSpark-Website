export default interface ChatItemDTO {
  type: "MESSAGE" | "ATTACHMENT" | "CONTEXT",
  content?: string,
  fileId?: string,
  fileName?: string,
  fileType?: string, 
}