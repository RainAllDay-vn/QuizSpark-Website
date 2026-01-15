# Project Context

## Current Work Focus
The project is in an active development phase, with a functional core for question banking, practicing, and classroom management. Recent efforts have focused on enhancing the AI capabilities (chatbot and file parsing) and building a more interactive workspace for students and teachers.

## Recent Changes
-   **AI Integration**: Implementation of `GlobalChatBot` and `ChatBotContext` to manage chat sessions and stream responses from the backend.
-   **Workspace**: Creation of `WorkspacePage`, `WorkspaceContext`, and drag-and-drop pane management for multitasking (PDF viewing + Markdown editing).
-   **DTOs**: Refactored `ChatItemDTO` to include a dedicated `metadata` field for structured data, moving PDF page information from `content` to `metadata` in `WorkspacePage`.
-   **PdfViewer Improvement**: Enhanced mode switching between single-page and scroll view to maintain page context by automatically scrolling to the current page.
-   **Endless Practice Mode**: Integrated routing for the new Endless Practice Mode. Updated `PracticeOptionsDialog`, `PracticeCard`, and `SummarySection` to handle conditional navigation to `/practice/endless/:practiceId`.

## Next Steps
-   **Refinement**: Improve the stability and error handling of the real-time AI features (SSE integration).
-   **Testing**: Add comprehensive tests for critical components, especially the new AI and Workspace modules.
-   **UI Polish**: Enhance the user interface for smoother transitions and better responsiveness on smaller screens.
-   **Documentation**: Ensure all new modules are well-documented for future maintainability.