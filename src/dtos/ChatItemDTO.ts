export default interface ChatItemDTO {
  /** The type of the chat item */
  type: "MESSAGE" | "ATTACHMENT" | "CONTEXT",
  /** Description of the context */
  description?: string,
  /**
   * The text content of the message.
   * If a file is sent, this holds base64 data (binary) or raw text (text files).
   */
  content?: string,
  /**
   * The unique identifier of the attached file.
   * If provided, the server will use the file in the database instead of the content field.
   */
  fileId?: string,
  /** The name of the attached file */
  fileName?: string,
  /** The MIME type or category of the attached file */
  fileType?: string,
  /**
   * Additional structured data associated with the chat item.
   * This is used for context-specific information like PDF page numbers.
   */
  metadata?: Record<string, any>,
}